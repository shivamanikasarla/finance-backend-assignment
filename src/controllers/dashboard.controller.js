import Transaction from '../models/transaction.model.js';
import sequelize from '../db/connection.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const stats = await Transaction.findAll({
      attributes: [
        'type',
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
      ],
      group: ['type'],
    });

    const categoryStats = await Transaction.findAll({
      attributes: [
        'category',
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
      ],
      group: ['category'],
    });

    const recentActivity = await Transaction.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
    });

    let totalIncome = 0;
    let totalExpense = 0;

    stats.forEach(stat => {
      if (stat.type === 'INCOME') totalIncome = parseFloat(stat.get('totalAmount'));
      if (stat.type === 'EXPENSE') totalExpense = parseFloat(stat.get('totalAmount'));
    });

    res.json({
      summary: {
        totalIncome,
        totalExpenses: totalExpense,
        netBalance: totalIncome - totalExpense,
      },
      categoryWiseTotals: categoryStats,
      recentActivity,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error generating summary', details: err.message });
  }
};
