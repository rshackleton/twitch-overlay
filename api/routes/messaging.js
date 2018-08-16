import { Router } from 'express';
import { storeToken, subscribe } from '../services/messaging';

const router = new Router();

// Store token to be used for cloud messaging.
router.post('/token', (req, res) => {
  try {
    const token = req.body.token;

    return storeToken(token)
      .then(() => {
        return subscribe(token)
          .then(result => {
            return res.json(result);
          })
          .catch(result => {
            return res.json(false);
          });
      })
      .catch(result => {
        return res.json(false);
      });
  } catch (err) {
    logger.error(err);
    return res.json(false);
  }
});

export default router;
