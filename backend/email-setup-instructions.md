# Email Setup Instructions

## 📧 **Setup Gmail for Sending Emails**

### **Step 1: Enable 2-Factor Authentication**
1. Go to your Google Account settings
2. Security → 2-Step Verification → Turn it ON

### **Step 2: Generate App Password**
1. Go to Google Account settings
2. Security → 2-Step Verification → App passwords
3. Select "Mail" and generate password
4. Copy the 16-character password

### **Step 3: Create .env File**
Create `backend/.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/serviceapp
JWT_SECRET=mysecretkey123
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
PORT=5000
```

### **Step 4: Test Email Functionality**
1. Start backend: `npm run dev`
2. Register a new user
3. Check email inbox for welcome message
4. Try payment to test payment confirmation email

## 🔧 **Troubleshooting**

**If emails don't send:**
- Check if 2FA is enabled
- Verify app password is correct
- Check spam folder
- Look at backend console for error messages

**Common Issues:**
- Using regular Gmail password instead of app password
- 2FA not enabled
- Wrong email address in .env file 