require('dotenv').config();
const { sendPaymentConfirmation } = require('./services/emailService');

async function testSimplePayment() {
  console.log('🧪 Testing Simple Payment Email (without PDF)...');
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
    console.log('\n📤 Sending payment confirmation...');
    const result = await sendPaymentConfirmation(userData, paymentData);
    
    if (result.success) {
      console.log('✅ Payment confirmation sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('\n🎯 Check your email inbox for the payment confirmation!');
    } else {
      console.log('❌ Payment email failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('🔍 Full error:', error);
  }
  
  console.log('\n=====================================');
  console.log('📝 Next Steps:');
  console.log('1. Check if email was received');
  console.log('2. If email works, PDF issue might be with pdfkit package');
  console.log('3. If email fails, check .env configuration');
}

testSimplePayment(); 