import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Clean request logging

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Finance Data Processing and Access Control Backend API',
    version: '1.0.0',
    status: 'Ready'
  });
});

// App Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

export default app;
