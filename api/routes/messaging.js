import { Router } from 'express';

const router = new Router();

// Store token to be used for cloud messaging.
router.post('/token', (req, res) => {
  try {
    const token = req.body.token;

    return messaging
      .storeToken(token)
      .then(() => {
        return messaging
          .subscribe(token)
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
