require('dotenv').config();
const { sendRegistrationConfirmation } = require('./services/emailService');

async function debugEmailIssue() {
  console.log('🔍 Debugging Email Issue...');
  console.log('=====================================');
  
  // Check environment variables
  console.log('📧 EMAIL_USER (sender):', process.env.EMAIL_USER);
  console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Email credentials not configured!');
    return;
  }
  
  // Test with different recipient emails
  const testCases = [
    {
      name: 'Test User 1',
      email: 'test1@example.com',
      location: 'Test Location 1'
    },
    {
      name: 'Test User 2', 
      email: 'test2@example.com',
      location: 'Test Location 2'
    },
    {
      name: 'Real User',
      email: 'user@differentdomain.com',
      location: 'Real Location'
    }
  ];
  
  for (let i = 0; i < testCases.length; i++) {
    const testUser = testCases[i];
    console.log(`\n🧪 Test Case ${i + 1}:`);
    console.log('   Name:', testUser.name);
    console.log('   Email:', testUser.email);
    console.log('   Location:', testUser.location);
    
    try {
      console.log('   📤 Sending email...');
      const result = await sendRegistrationConfirmation(testUser);
      
      if (result.success) {
        console.log('   ✅ Email sent successfully!');
        console.log('   📧 Message ID:', result.messageId);
      } else {
        console.log('   ❌ Email failed:', result.error);
      }
    } catch (error) {
      console.log('   ❌ Test failed:', error.message);
    }
    
    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n=====================================');
  console.log('🔍 Analysis:');
  console.log('1. Check if emails are being sent to the correct addresses');
  console.log('2. Check your email inbox for test emails');
  console.log('3. If emails are going to wrong address, check .env file');
  console.log('4. Make sure EMAIL_USER is your Gmail and not the recipient');
}

debugEmailIssue(); 