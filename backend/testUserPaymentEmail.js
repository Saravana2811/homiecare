require('dotenv').config();
const { sendPaymentConfirmation } = require('./services/emailService');

async function testUserPaymentEmail() {
  console.log('🧪 Testing Payment Email to User Signup Email');
  console.log('=====================================');
  
  // Check environment variables
  console.log('📧 EMAIL_USER (sender):', process.env.EMAIL_USER);
  console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Email credentials not configured!');
    console.log('📝 Please create .env file with your Gmail credentials');
    return;
  }
  
  // Simulate user data from signup (this would come from database in real app)
  const userData = {
    name: 'John Smith',
    email: 'john.smith@example.com', // This is the user's signup email
    location: 'Mumbai, Maharashtra'
  };
  
  const paymentData = {
    serviceName: 'AC Installation',
    servicerName: 'Professional AC Service Provider',
    amount: '₹15,000',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN' + Date.now()
  };
  
  console.log('\n👤 User Data (from signup):');
  console.log('   Name:', userData.name);
  console.log('   Email:', userData.email);
  console.log('   Location:', userData.location);
  
  console.log('\n💳 Payment Data:');
  console.log('   Service:', paymentData.serviceName);
  console.log('   Servicer:', paymentData.servicerName);
  console.log('   Amount:', paymentData.amount);
  console.log('   Transaction ID:', paymentData.transactionId);
  
  console.log('\n📧 Email Flow:');
  console.log('   FROM:', process.env.EMAIL_USER, '(your Gmail)');
  console.log('   TO:', userData.email, '(user signup email)');
  console.log('   SUBJECT: Payment Confirmation - Service Booking');
  console.log('   ATTACHMENT: PDF bill with payment details');
  
  try {
    console.log('\n📤 Sending payment confirmation...');
    const result = await sendPaymentConfirmation(userData, paymentData);
    
    if (result.success) {
      console.log('✅ Payment confirmation sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('\n🎯 Email sent to:', userData.email);
      console.log('📄 PDF bill attached to email');
      console.log('\n📝 Summary:');
      console.log('   • Email sent FROM your Gmail account');
      console.log('   • Email sent TO user signup email');
      console.log('   • PDF bill attached with payment details');
      console.log('   • User receives confirmation at their signup email');
    } else {
      console.log('❌ Payment email failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('🔍 Full error:', error);
  }
  
  console.log('\n=====================================');
  console.log('📝 Key Points:');
  console.log('1. Email FROM: Your Gmail (EMAIL_USER in .env)');
  console.log('2. Email TO: User signup email (userData.email)');
  console.log('3. Amount: Based on service chosen');
  console.log('4. User data: Comes from signup/login');
  console.log('5. PDF bill: Attached to email');
}

testUserPaymentEmail(); 