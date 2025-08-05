require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Simple payment test route (without database)
app.post('/api/payment/test', (req, res) => {
  try {
    const { serviceName, amount, paymentMethod, servicerName } = req.body;
    
    // Generate transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
    
    res.json({
      success: true,
      message: 'Payment test successful!',
      transactionId: transactionId,
      emailSent: false, // No email in test mode
      data: {
        serviceName: serviceName || 'Test Service',
        amount: amount || '₹0',
        paymentMethod: paymentMethod || 'Test Payment',
        servicerName: servicerName || 'Test Provider'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Test payment failed',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Test server started on port ${PORT}`);
  console.log(`📡 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`💳 Payment test endpoint: http://localhost:${PORT}/api/payment/test`);
}); 