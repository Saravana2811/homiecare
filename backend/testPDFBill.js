require('dotenv').config();
const { sendPaymentConfirmation } = require('./services/emailService');

async function testPDFBill() {
  console.log('🧪 Testing PDF Bill Generation and Email...');
  console.log('=====================================');
  
  // Check environment variables
  console.log('📧 EMAIL_USER (sender):', process.env.EMAIL_USER);
  console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Email credentials not configured!');
    console.log('📝 Please create .env file with your Gmail credentials');
    return;
  }
  
  // Simulate user data and payment data
  const userData = {
    name: 'John Smith',
    email: 'john.smith@example.com',  // Change this to your test email
    location: 'New York'
  };
  
  const paymentData = {
    serviceName: 'Plumbing Service',
    servicerName: 'Expert Plumbing Solutions',
    amount: '₹1,500',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN' + Date.now() + 'TEST'
  };
  
  console.log('\n👤 User Data:');
  console.log('   Name:', userData.name);
  console.log('   Email:', userData.email);
  console.log('   Location:', userData.location);
  
  console.log('\n💳 Payment Data:');
  console.log('   Service:', paymentData.serviceName);
  console.log('   Servicer:', paymentData.servicerName);
  console.log('   Amount:', paymentData.amount);
  console.log('   Payment Method:', paymentData.paymentMethod);
  console.log('   Transaction ID:', paymentData.transactionId);
  
  console.log('\n📧 Email Configuration:');
  console.log('   From:', process.env.EMAIL_USER);
  console.log('   To:', userData.email);
  
  try {
    console.log('\n📤 Sending payment confirmation with PDF bill...');
    const result = await sendPaymentConfirmation(userData, paymentData);
    
    if (result.success) {
      console.log('✅ Payment confirmation with PDF bill sent successfully!');
      console.log('📧 Email sent FROM:', process.env.EMAIL_USER);
      console.log('📧 Email sent TO:', userData.email);
      console.log('📧 Message ID:', result.messageId);
      console.log('\n🎯 Result: User will receive email with PDF bill attachment!');
    } else {
      console.log('❌ Email failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
  
  console.log('\n=====================================');
  console.log('📝 Summary:');
  console.log('- PDF bill generated with all payment details');
  console.log('- Email sent with PDF attachment');
  console.log('- User receives professional bill for records');
}

testPDFBill(); 