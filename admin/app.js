import express from 'express';
import path from 'path';

// const NODE_ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Twitch overlay admin listening on http://${HOST}:${PORT}`);
});
