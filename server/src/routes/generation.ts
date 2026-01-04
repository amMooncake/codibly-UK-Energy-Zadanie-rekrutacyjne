import { Router } from 'express';
import { getGenerationData } from '../controllers/GenerationController.js';

const router = Router();

// final url: /api/generationmix/
router.get('/', getGenerationData);

export default router;