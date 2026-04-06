import app from './app.js';
import sequelize from './db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
  
    await sequelize.authenticate();
    console.log('Connected to SQLite database successfully');

  
    await sequelize.sync({ force: false }); 
    console.log('Database synced');

    
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
