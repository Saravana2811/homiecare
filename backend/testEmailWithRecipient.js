require('dotenv').config();
const { sendRegistrationConfirmation } = require('./services/emailService');

// Get recipient email from command line argument or use default
const recipientEmail = process.argv[2] || 'test@example.com';

async function testEmail() {
  console.log('🧪 Testing Email Service...');
  console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
  console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
  console.log('📨 Sending to:', recipientEmail);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Email credentials not found in .env file!');
    console.log('📝 Please create .env file with:');
    console.log('EMAIL_USER=your_email@gmail.com');
    console.log('EMAIL_PASSWORD=your_16_character_app_password');
    return;
  }
  
  const testUser = {
    name: 'Test User',
    email: recipientEmail,
    location: 'Test Location'
  };
  
  try {
    console.log('📤 Sending test email...');
    const result = await sendRegistrationConfirmation(testUser);
    
    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log('📧 Check your inbox for the welcome email');
    } else {
      console.log('❌ Test email failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testEmail(); 