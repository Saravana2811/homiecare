require('dotenv').config();
const { sendRegistrationConfirmation } = require('./services/emailService');

async function testRealUserEmail() {
  console.log('🧪 Testing Email Service with Real User Data...');
  console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
  console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Email credentials not found in .env file!');
    console.log('📝 Please create .env file with:');
    console.log('EMAIL_USER=your_email@gmail.com');
    console.log('EMAIL_PASSWORD=your_16_character_app_password');
    return;
  }
  
  // Simulate real user data from signup form
  const realUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com', // This would be the email user enters in signup
    location: 'New York'
  };
  
  console.log('👤 Testing with user data:');
  console.log('   Name:', realUserData.name);
  console.log('   Email:', realUserData.email);
  console.log('   Location:', realUserData.location);
  
  try {
    console.log('📤 Sending welcome email to user...');
    const result = await sendRegistrationConfirmation(realUserData);
    
    if (result.success) {
      console.log('✅ Welcome email sent successfully!');
      console.log('📧 Email sent to:', realUserData.email);
      console.log('📧 From:', process.env.EMAIL_USER);
      console.log('📧 Message ID:', result.messageId);
    } else {
      console.log('❌ Email failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testRealUserEmail(); 