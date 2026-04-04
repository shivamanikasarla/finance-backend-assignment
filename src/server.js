import app from './app.js';
import sequelize from './db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to Database
    await sequelize.authenticate();
    console.log('Connected to SQLite database successfully');

    // Sync models
    await sequelize.sync({ force: false }); // Do not clear DB on restart
    console.log('Database synced');

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`- API Base: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
};

startServer();
