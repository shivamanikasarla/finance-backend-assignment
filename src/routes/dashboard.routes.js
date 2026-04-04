import express from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Everyone (Viewer, Analyst, Admin) can access summary
router.get('/summary', authenticate, authorize(['VIEWER', 'ANALYST', 'ADMIN']), getDashboardSummary);

export default router;
