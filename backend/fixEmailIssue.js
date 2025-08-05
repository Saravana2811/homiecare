const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING EMAIL ISSUES');
console.log('=====================================');

// 1. Install required packages
console.log('\n📦 1. INSTALLING PACKAGES...');
try {
  console.log('Installing nodemailer...');
  execSync('npm install nodemailer', { stdio: 'inherit' });
  console.log('✅ nodemailer installed');
} catch (error) {
  console.log('❌ Failed to install nodemailer:', error.message);
}

try {
  console.log('Installing pdfkit...');
  execSync('npm install pdfkit', { stdio: 'inherit' });
  console.log('✅ pdfkit installed');
} catch (error) {
  console.log('❌ Failed to install pdfkit:', error.message);
}

// 2. Create temp directory
console.log('\n📁 2. CREATING TEMP DIRECTORY...');
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  try {
    fs.mkdirSync(tempDir);
    console.log('✅ temp directory created');
  } catch (error) {
    console.log('❌ Failed to create temp directory:', error.message);
  }
} else {
  console.log('✅ temp directory already exists');
}

// 3. Check .env file
console.log('\n📧 3. CHECKING .ENV FILE...');
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file does not exist');
  console.log('📝 Creating .env file template...');
  
  const envTemplate = `# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your_16_character_app_password

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/your_database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
`;
  
  try {
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ .env file created with template');
    console.log('📝 Please edit .env file with your actual credentials');
  } catch (error) {
    console.log('❌ Failed to create .env file:', error.message);
  }
} else {
  console.log('✅ .env file exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasEmailUser = envContent.includes('EMAIL_USER=');
  const hasEmailPassword = envContent.includes('EMAIL_PASSWORD=');
  
  if (!hasEmailUser || !hasEmailPassword) {
    console.log('⚠️  .env file exists but email credentials may be missing');
    console.log('📝 Please check your .env file has:');
    console.log('   EMAIL_USER=your-gmail@gmail.com');
    console.log('   EMAIL_PASSWORD=your_16_character_app_password');
  } else {
    console.log('✅ Email credentials configured in .env');
  }
}

console.log('\n=====================================');
console.log('🎯 NEXT STEPS:');
console.log('1. Edit .env file with your Gmail credentials');
console.log('2. Enable 2-Factor Authentication on Gmail');
console.log('3. Generate App Password in Gmail settings');
console.log('4. Test email: node testSimpleEmail.js');
console.log('5. Test PDF: node testPDFBill.js');
console.log('6. Start backend: npm run dev');

console.log('\n📧 GMAIL SETUP INSTRUCTIONS:');
console.log('1. Go to Google Account settings');
console.log('2. Security → 2-Step Verification → App passwords');
console.log('3. Select "Mail" and generate password');
console.log('4. Copy the 16-character password to .env file');

console.log('\n✅ FIX COMPLETE!'); 