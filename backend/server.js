require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/authroutes.js'));
app.use('/api/payment', require('./routes/paymentRoutes.js'));

// Test route to check if server is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

// Start server with database connection
const startServer = async () => {
  try {
    // Try to connect to database
    await connectDB();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.log('⚠️  Database connection failed, starting server without database');
    console.log('📝 You can still test the API endpoints');
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`📡 Test endpoint: http://localhost:${PORT}/api/test`);
    console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
    console.log(`💳 Payment endpoints: http://localhost:${PORT}/api/payment`);
  });
};

startServer();