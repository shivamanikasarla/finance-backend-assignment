import express from 'express';
import { 
  createTransaction, 
  getTransactions, 
  updateTransaction, 
  deleteTransaction 
} from '../controllers/transaction.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All transactions routes require authentication
router.use(authenticate);

// Analyst and Admin can view records
router.get('/', authorize(['ANALYST', 'ADMIN']), getTransactions);

// Admin only can manage records
router.post('/', authorize(['ADMIN']), createTransaction);
router.put('/:id', authorize(['ADMIN']), updateTransaction);
router.delete('/:id', authorize(['ADMIN']), deleteTransaction);

export default router;
