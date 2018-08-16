import logger from './services/logger';

const NODE_ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.VIRTUAL_PORT || 5000;

const isProduction = NODE_ENV === 'production';

let app;

/* eslint-disable */
if (isProduction) {
  app = require('./app.prd');
} else {
  app = require('./app.dev');
}
/* eslint-enable */

app.listen(PORT, HOST, () => {
  logger.info(`Twitch overlay admin listening on http://${HOST}:${PORT}`);
});
