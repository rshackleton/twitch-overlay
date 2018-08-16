import { Router } from 'express';
import { all, insertTest } from '../services/donations';

const router = new Router();

// Get all donations (web socket is preferred).
router.get('/', (req, res) => {
  all().then(models => res.json(models));
});

// Insert a fake donation (for testing).
router.post('/fake', (req, res) => {
  insertTest().then(donation => res.json(donation));
});

export default router;
