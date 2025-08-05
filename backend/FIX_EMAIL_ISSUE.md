# Fix Email Issue - Emails Sent to Wrong Address

## 🔍 **Problem:**
Emails are being sent to your own account instead of the user's email address.

## 🔧 **Root Cause:**
The `.env` file likely has the same email address for both:
- `EMAIL_USER` (sender - your Gmail)
- User's email (recipient - should be different)

## ✅ **Solution:**

### **Step 1: Check your .env file**
Your `.env` file should look like this:

```env
MONGODB_URI=mongodb://localhost:27017/serviceapp
JWT_SECRET=mysecretkey123
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
PORT=5000
```

**Important:**
- `EMAIL_USER` should be YOUR Gmail address (the sender)
- User emails will be different addresses (the recipients)

### **Step 2: Test with different recipient**
Run the debug script to test:

```bash
cd backend
node debugEmailIssue.js
```

This will send test emails to different addresses to verify the fix.

### **Step 3: Test real signup**
1. Start backend: `npm run dev`
2. Go to frontend and register with a different email address
3. Check if welcome email goes to the user's email (not yours)

## 🧪 **Expected Results:**
- ✅ **From:** your-gmail@gmail.com (your Gmail)
- ✅ **To:** user@example.com (user's email from signup)
- ✅ **Email content:** Welcome message with user's name

## ❌ **Common Mistakes:**
1. **Same email for sender and recipient**
2. **Wrong email in .env file**
3. **Using regular Gmail password instead of App Password**

## 🔍 **Debug Steps:**
1. Run: `node debugEmailIssue.js`
2. Check console output for email addresses
3. Check your email inbox for test emails
4. Verify emails are going to correct addresses

## 📧 **Test Commands:**
```bash
# Test with specific recipient
node testEmailWithRecipient.js user@example.com

# Debug email issue
node debugEmailIssue.js

# Test real user flow
node testRealUserEmail.js
``` 