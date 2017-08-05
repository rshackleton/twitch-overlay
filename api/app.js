const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const donations = require('./services/donations');
const logger = require('./services/logger');

const NODE_ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.VIRTUAL_PORT || 5000;

app.use(cors());
app.use(morgan('combined', { 'stream': logger.stream }));

app.get('/donations', (req, res) => {
  donations.all().then(models => res.json(models));
});

server.listen(PORT, HOST, () => {
  logger.debug(`Twitch overlay api listening on http://${HOST}:${PORT}`);
});

io.on('connection', (socket) => {
  logger.debug('connection started');
  socket.on('disconnect', () => {
    logger.debug('connection ended');
  });
});

donations.stream().then(stream => stream.subscribe(
  function next(donation) {
    logger.debug('donation stream: new');
    io.emit('donation', donation);
  },
  function error(err) {
    logger.error('donation stream: error');
  },
  function complete() {
    logger.debug('donation stream: complete');
  },
));
