import { Router } from 'express';
import { publicController } from '../controllers/publicController';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact Route
router.post('/public/contact', publicController.contact);

export default router;
