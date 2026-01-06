import { Router } from 'express';
import { getGenerationData } from '../controllers/GenerationController.js';
import { calculateBestChargingWindow } from '../controllers/BestWindowController.js';

const router = Router();

// final url: /api/generationmix/
router.get('/', getGenerationData);

// final url: /api/generationmix/best-window
router.post('/best-window', calculateBestChargingWindow);

export default router;