import Transaction from '../models/transaction.model.js';
import { Op } from 'sequelize';

export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: 'Invalid request data', details: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { category, type, startDate, endDate } = req.query;
    const where = {};
    if (category) where.category = category;
    if (type) where.type = type;
    if (startDate && endDate) where.date = { [Op.between]: [startDate, endDate] };

    const transactions = await Transaction.findAll({ where, order: [['date', 'DESC']] });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

    await transaction.update(req.body);
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: 'Update failed', details: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await Transaction.destroy({ where: { id } });
    if (!rows) return res.status(404).json({ error: 'Transaction not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
