const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const donations = require('./services/donations');
const logger = require('./services/logger');
const messaging = require('./services/messaging');

const NODE_ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.VIRTUAL_PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { 'stream': logger.stream }));

// Get all donations (web socket is preferred).
app.get('/donations', (req, res) => {
  donations.all().then(models => res.json(models));
});

// Insert a fake donation (for testing).
app.post('/donations/fake', (req, res) => {
  donations.insertTest().then(model => res.json(model));
});

// Insert a fake donation (for testing).
app.post('/messaging/token', (req, res) => {
  try {
    const token = req.body.token;

    return messaging.storeToken(token)
      .then(() => {
        return messaging.subscribe(token)
          .then((result) => {
            return res.json(result);
          })
          .catch((result) => {
            return res.json(false);
          });
      })
      .catch((result) => {
        return res.json(false);
      });
  } catch (err) {
    logger.error(err);
    return res.json(false);
  }
});

// Start API server.
server.listen(PORT, HOST, () => {
  logger.debug(`Twitch overlay api listening on http://${HOST}:${PORT}`);
});

// Handle web socket connections.
io.on('connection', (socket) => {
  logger.debug('connection started');

  // Emit all existing donations.
  donations.all().then(models => {
    socket.emit('existing-donations', models);
  });

  // Handle web socket disconnections.
  socket.on('disconnect', () => {
    logger.debug('connection ended');
  });
});

// Start donation stream, emit all changes to web socket connections.
donations.stream().then(stream => stream.subscribe(
  function next(donation) {
    logger.debug('donation stream: new', donation.new_val);

    // Send push notification.
    messaging.send(donation.new_val);

    // Send update to all connected clients.
    io.emit('new-donation', donation);
  },
  function error(err) {
    logger.error('donation stream: error');
  },
  function complete() {
    logger.debug('donation stream: complete');
  },
));
