/* eslint-disable */
import path from 'path';
import express from 'express';
import morgan from 'morgan';

import logger from './services/logger';

const app = express();

app.use(
  morgan('combined', {
    stream: {
      write: function(message) {
        logger.info(message);
      },
    },
  }),
);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
