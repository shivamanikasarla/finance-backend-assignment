import User from './models/user.model.js';
import Transaction from './models/transaction.model.js';
import sequelize from './db/connection.js';

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // Clear for clean seeding
    console.log('Cleaned DB for seeding...');

    // 1. Create Users
    const admin = await User.create({
      fullName: 'John Admin',
      email: 'admin@zorvyn.com',
      password: 'adminpassword123',
      role: 'ADMIN'
    });

    const analyst = await User.create({
      fullName: 'Sarah Analyst',
      email: 'analyst@zorvyn.com',
      password: 'analystpassword123',
      role: 'ANALYST'
    });

    const viewer = await User.create({
      fullName: 'Kevin Viewer',
      email: 'viewer@zorvyn.com',
      password: 'viewerpassword123',
      role: 'VIEWER'
    });

    console.log('Sample users created');

    // 2. Create Sample Transactions
    const transactions = [
      { amount: 5000, type: 'INCOME', category: 'Salary', date: '2026-03-01', notes: 'Monthly Payroll', createdBy: admin.id },
      { amount: 120, type: 'EXPENSE', category: 'Food', date: '2026-03-10', notes: 'Team Lunch', createdBy: admin.id },
      { amount: 1500, type: 'INCOME', category: 'Freelance', date: '2026-03-15', notes: 'Landing Page Project', createdBy: admin.id },
      { amount: 800, type: 'EXPENSE', category: 'Rent', date: '2026-03-01', notes: 'Office Rent', createdBy: admin.id },
      { amount: 50, type: 'EXPENSE', category: 'Subscription', date: '2026-03-05', notes: 'SaaS Tool', createdBy: admin.id },
      { amount: 200, type: 'EXPENSE', category: 'Utility', date: '2026-03-12', notes: 'Internet & Electricity', createdBy: admin.id },
    ];

    await Transaction.bulkCreate(transactions);
    console.log('Sample transactions created');
    console.log('Seeding complete! You can now login with:');
    console.log('- admin@zorvyn.com / adminpassword123');
    console.log('- analyst@zorvyn.com / analystpassword123');
    console.log('- viewer@zorvyn.com / viewerpassword123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
