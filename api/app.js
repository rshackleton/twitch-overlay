import logger from './services/logger';

import cors from 'cors';
import morgan from 'morgan';

import express from 'express';
import { json } from 'body-parser';
import { createServer } from 'http';
import socketIO from 'socket.io';

import { all, stream as _stream } from './services/donations';
import { send } from './services/messaging';
import routes from './routes';

// Create express app.
const app = express();

// Create HTTP server to serve express app.
const server = createServer(app);

// Create Socket.IO instance and attach to HTTP server.
const io = socketIO(server);

// Configure middleware.
app.use(cors());
app.use(json());
app.use(
  morgan('combined', {
    stream: {
      write: function(message) {
        logger.info(message);
      },
    },
  }),
);

// Register all routes.
Object.keys(routes).forEach(key => {
  app.use(key, routes[key]);
});

// Start API server.
const host = process.env.HOST || '0.0.0.0';
const port = process.env.VIRTUAL_PORT || 5000;

server.listen(port, host, () => {
  logger.info(`Twitch overlay api listening on http://${host}:${port}`);
});

// Handle web socket connections.
io.on('connection', socket => {
  logger.info('connection started');

  // Emit all existing donations.
  all().then(models => {
    socket.emit('existing-donations', models);
  });

  // Handle web socket disconnections.
  socket.on('disconnect', () => {
    logger.info('connection ended');
  });
});

// Start donation stream, emit all changes to web socket connections.
_stream().subscribe(
  function next(snapshot) {
    snapshot.docChanges().forEach(change => {
      const donation = change.doc.data();

      logger.info(`donation stream: new ${donation.externalId}`);

      // Send push notification.
      send(donation);

      // Send update to all connected clients.
      io.emit('new-donation', donation);
    });
  },
  function error(err) {
    logger.error(err);
  },
  function complete() {
    logger.info('donation stream: complete');
  },
);
