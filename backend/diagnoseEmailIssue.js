require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('🔍 COMPREHENSIVE EMAIL DIAGNOSTIC');
console.log('=====================================');

// 1. Check .env file
console.log('\n📁 1. CHECKING .ENV FILE:');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasEmailUser = envContent.includes('EMAIL_USER=');
  const hasEmailPassword = envContent.includes('EMAIL_PASSWORD=');
  
  console.log('📧 EMAIL_USER configured:', hasEmailUser ? '✅ YES' : '❌ NO');
  console.log('🔑 EMAIL_PASSWORD configured:', hasEmailPassword ? '✅ YES' : '❌ NO');
  
  if (hasEmailUser) {
    const emailUserMatch = envContent.match(/EMAIL_USER=(.+)/);
    if (emailUserMatch) {
      console.log('📧 Email address:', emailUserMatch[1].trim());
    }
  }
} else {
  console.log('❌ .env file does not exist!');
  console.log('📝 Create .env file in backend folder with:');
  console.log('   EMAIL_USER=your-gmail@gmail.com');
  console.log('   EMAIL_PASSWORD=your_16_character_app_password');
}

// 2. Check environment variables
console.log('\n🔧 2. CHECKING ENVIRONMENT VARIABLES:');
console.log('📧 EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ SET' : '❌ NOT SET');

// 3. Check package installations
console.log('\n📦 3. CHECKING PACKAGES:');
try {
  const nodemailer = require('nodemailer');
  console.log('✅ nodemailer installed');
} catch (error) {
  console.log('❌ nodemailer not installed');
  console.log('💡 Run: npm install nodemailer');
}

try {
  const pdfkit = require('pdfkit');
  console.log('✅ pdfkit installed');
} catch (error) {
  console.log('❌ pdfkit not installed');
  console.log('💡 Run: npm install pdfkit');
}

// 4. Check temp directory
console.log('\n📁 4. CHECKING TEMP DIRECTORY:');
const tempDir = path.join(__dirname, 'temp');
if (fs.existsSync(tempDir)) {
  console.log('✅ temp directory exists');
} else {
  console.log('❌ temp directory does not exist');
  console.log('💡 Creating temp directory...');
  try {
    fs.mkdirSync(tempDir);
    console.log('✅ temp directory created');
  } catch (error) {
    console.log('❌ Failed to create temp directory:', error.message);
  }
}

// 5. Test basic email functionality
console.log('\n🧪 5. TESTING BASIC EMAIL:');
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.log('❌ Cannot test email - credentials not configured');
} else {
  console.log('📧 Will test with email:', process.env.EMAIL_USER);
  console.log('💡 Run: node testSimpleEmail.js to test email sending');
}

// 6. Check backend server status
console.log('\n🖥️ 6. BACKEND SERVER STATUS:');
console.log('💡 Make sure backend is running with: npm run dev');
console.log('💡 Check if server starts without errors');

// 7. Check frontend connection
console.log('\n🌐 7. FRONTEND CONNECTION:');
console.log('💡 Make sure frontend can connect to backend');
console.log('💡 Check browser console for network errors');

console.log('\n=====================================');
console.log('📝 NEXT STEPS:');
console.log('1. If .env is missing: Create it with your Gmail credentials');
console.log('2. If packages missing: Run npm install nodemailer pdfkit');
console.log('3. Test basic email: node testSimpleEmail.js');
console.log('4. Test PDF email: node testPDFBill.js');
console.log('5. Check spam folder for emails');
console.log('6. Start backend: npm run dev');
console.log('7. Test payment through frontend');

console.log('\n🔧 QUICK FIXES:');
console.log('• Install packages: npm install nodemailer pdfkit');
console.log('• Create .env: EMAIL_USER=your-gmail@gmail.com');
console.log('• Add App Password: EMAIL_PASSWORD=your_16_char_password');
console.log('• Enable 2FA on Gmail and generate App Password'); 