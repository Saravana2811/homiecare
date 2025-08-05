# Email Troubleshooting Guide

## 🔍 **Step 1: Check if .env file exists**

Create a file named `.env` in the `backend` folder with this content:

```env
MONGODB_URI=mongodb://localhost:27017/serviceapp
JWT_SECRET=mysecretkey123
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
PORT=5000
```

## 🔧 **Step 2: Set up Gmail App Password**

### **Enable 2-Factor Authentication:**
1. Go to your Google Account settings
2. Security → 2-Step Verification → Turn it ON

### **Generate App Password:**
1. Go to Google Account settings
2. Security → 2-Step Verification → App passwords
3. Select "Mail" and generate password
4. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### **Update .env file:**
Replace `your_email@gmail.com` with your actual Gmail
Replace `your_16_character_app_password` with the app password (remove spaces)

## 🧪 **Step 3: Test Email Service**

**Important**: Before testing, edit `testEmail.js` and change the test email address:

```javascript
const testUser = {
  name: 'Test User',
  email: 'your-test-email@gmail.com', // Change this to your test email
  location: 'Test Location'
};
```

Then run this command to test if emails work:

```bash
cd backend
node testEmail.js
```

## 🔍 **Step 4: Check Backend Logs**

Start the backend and check for email debug messages:

```bash
cd backend
npm run dev
```

Look for these messages in the console:
- `🔍 Email Service Debug:`
- `📧 EMAIL_USER: your_email@gmail.com`
- `🔑 EMAIL_PASSWORD: ***SET***`

## ❌ **Common Issues & Solutions**

### **Issue 1: "Email credentials not configured"**
- **Solution**: Create `.env` file with proper credentials

### **Issue 2: "Invalid login" or "Authentication failed"**
- **Solution**: Use App Password, not regular Gmail password

### **Issue 3: "Less secure app access" error**
- **Solution**: Enable 2-Factor Authentication and use App Password

### **Issue 4: "Connection timeout"**
- **Solution**: Check internet connection and firewall settings

## 📧 **Test Registration Email**

1. Start backend: `npm run dev`
2. Go to frontend and register a new user
3. Check backend console for email debug messages
4. Check your email inbox (and spam folder)

## 💳 **Test Payment Email**

1. Make a payment through the frontend
2. Check backend console for payment email debug messages
3. Check your email inbox for payment confirmation

## 🆘 **Still Not Working?**

Run the test script and share the output:
```bash
node testEmail.js
```

This will show exactly what's wrong with the email configuration. 