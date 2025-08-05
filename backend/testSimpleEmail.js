require('dotenv').config();
const { sendSimplePaymentConfirmation } = require('./services/emailServiceSimple');

async function testSimpleEmail() {
  console.log('🧪 Testing Simple Payment Email (No PDF)...');
  console.log('=====================================');
  
  // Check environment variables
  console.log('📧 EMAIL_USER (sender):', process.env.EMAIL_USER);
  console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Email credentials not configured!');
    console.log('📝 Please create .env file with your Gmail credentials');
    return;
  }
  
  // Test with your actual email
  const userData = {
    name: 'Test User',
    email: process.env.EMAIL_USER, // Send to yourself for testing
    location: 'Test Location'
  };
  
  const paymentData = {
    serviceName: 'Test Service',
    servicerName: 'Test Provider',
    amount: '₹500',
    paymentMethod: 'Test Payment',
    transactionId: 'TXN' + Date.now()
  };
  
  console.log('\n👤 User Data:');
  console.log('   Name:', userData.name);
  console.log('   Email:', userData.email);
  console.log('   Location:', userData.location);
  
  console.log('\n💳 Payment Data:');
  console.log('   Service:', paymentData.serviceName);
  console.log('   Servicer:', paymentData.servicerName);
  console.log('   Amount:', paymentData.amount);
  console.log('   Transaction ID:', paymentData.transactionId);
  
  try {
    console.log('\n📤 Sending simple payment confirmation...');
    const result = await sendSimplePaymentConfirmation(userData, paymentData);
    
    if (result.success) {
      console.log('✅ Simple payment confirmation sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('\n🎯 Check your email inbox for the payment confirmation!');
    } else {
      console.log('❌ Simple payment email failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('🔍 Full error:', error);
  }
  
  console.log('\n=====================================');
  console.log('📝 Analysis:');
  console.log('If this works: PDF generation is the issue');
  console.log('If this fails: Email configuration is the issue');
}

testSimpleEmail(); 