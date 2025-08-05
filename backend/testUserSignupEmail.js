require('dotenv').config();
const { sendRegistrationConfirmation } = require('./services/emailService');

async function testUserSignupEmail() {
  console.log('🧪 Testing User Signup Email Flow...');
  console.log('=====================================');
  
  // Check environment variables
  console.log('📧 EMAIL_USER (sender):', process.env.EMAIL_USER);
  console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Email credentials not configured!');
    console.log('📝 Please create .env file with your Gmail credentials');
    return;
  }
  
  // Simulate user signup data (this is what comes from the signup form)
  const userSignupData = {
    name: 'John Smith',
    email: 'john.smith@example.com',  // This is the user's signup email
    location: 'New York'
  };
  
  console.log('\n👤 User Signup Data:');
  console.log('   Name:', userSignupData.name);
  console.log('   Email:', userSignupData.email);
  console.log('   Location:', userSignupData.location);
  
  console.log('\n📧 Email Configuration:');
  console.log('   From:', process.env.EMAIL_USER);
  console.log('   To:', userSignupData.email);
  
  try {
    console.log('\n📤 Sending welcome email to user...');
    const result = await sendRegistrationConfirmation(userSignupData);
    
    if (result.success) {
      console.log('✅ Welcome email sent successfully!');
      console.log('📧 Email sent FROM:', process.env.EMAIL_USER);
      console.log('📧 Email sent TO:', userSignupData.email);
      console.log('📧 Message ID:', result.messageId);
      console.log('\n🎯 Result: User will receive email at their signup address!');
    } else {
      console.log('❌ Email failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
  
  console.log('\n=====================================');
  console.log('📝 Summary:');
  console.log('- FROM: Your Gmail (configured in .env)');
  console.log('- TO: User\'s signup email address');
  console.log('- Content: Welcome message with user\'s name');
}

testUserSignupEmail(); 