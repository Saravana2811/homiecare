const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const User = require('../models/User');
const { sendPaymentConfirmation } = require('../services/emailService');

// Generate a unique transaction ID
const generateTransactionId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `TXN${timestamp}${random}`.toUpperCase();
};

// POST /api/payment/test
// Test payment route (no authentication required)
router.post('/test', async (req, res) => {
  try {
    const { serviceName, amount, paymentMethod, servicerName } = req.body;
    
    // Generate transaction ID
    const transactionId = generateTransactionId();
    
    // Prepare payment data
    const paymentData = {
      serviceName: serviceName || 'Test Service',
      amount: amount || '₹0',
      paymentMethod: paymentMethod || 'Test Payment',
      transactionId: transactionId,
      servicerName: servicerName || 'Test Provider'
    };
    
    res.json({
      success: true,
      message: 'Payment test successful!',
      transactionId: transactionId,
      emailSent: false, // No email in test mode
      data: paymentData
    });
    
  } catch (error) {
    console.error('Payment test error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Test payment failed',
      error: error.message 
    });
  }
});

// POST /api/payment/confirm
// Confirm payment and send email
router.post('/confirm', authMiddleware, async (req, res) => {
  try {
    const { serviceName, amount, paymentMethod, servicerName } = req.body;
    
    // Get user data from the authenticated token
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate transaction ID
    const transactionId = generateTransactionId();
    
    // Prepare payment data
    const paymentData = {
      serviceName: serviceName || 'Service',
      amount: amount || '₹0',
      paymentMethod: paymentMethod || 'Online Payment',
      transactionId: transactionId,
      servicerName: servicerName || 'Service Provider'
    };
    
    // Prepare user data for email
    const userData = {
      name: user.name,
      email: user.email,
      location: user.location
    };
    
    // Send payment confirmation email
    const emailResult = await sendPaymentConfirmation(userData, paymentData);
    
    if (emailResult.success) {
      res.json({
        success: true,
        message: 'Payment confirmed and email sent successfully',
        transactionId: transactionId,
        emailSent: true
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Payment confirmed but email sending failed',
        transactionId: transactionId,
        emailSent: false,
        error: emailResult.error
      });
    }
    
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during payment confirmation',
      error: error.message 
    });
  }
});

module.exports = router; 