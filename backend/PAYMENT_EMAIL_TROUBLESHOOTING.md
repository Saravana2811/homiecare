# Payment Email Troubleshooting Guide

## 🔍 **Problem: Payment Bill Email Not Being Sent**

Let's diagnose and fix the issue step by step.

## 🧪 **Step 1: Test Basic Email (No PDF)**

First, let's test if basic email functionality works:

```bash
cd backend
node testSimpleEmail.js
```

**Expected Output:**
- ✅ Email credentials configured
- ✅ Email sent successfully
- ✅ Check your inbox

**If this fails:** Email configuration issue

## 🧪 **Step 2: Test with PDF (If Step 1 Works)**

If basic email works, test PDF functionality:

```bash
cd backend
node testPDFBill.js
```

**Expected Output:**
- ✅ PDF generation started
- ✅ Email with PDF attachment sent
- ✅ Check your inbox for PDF

**If this fails:** PDF generation issue

## 🔧 **Common Issues & Solutions:**

### **Issue 1: Email Credentials Not Configured**
**Error:** `EMAIL_PASSWORD: ***NOT SET***`

**Solution:**
1. Create `.env` file in `backend/` folder
2. Add your Gmail credentials:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
```

### **Issue 2: PDFKit Not Installed**
**Error:** `Cannot find module 'pdfkit'`

**Solution:**
```bash
cd backend
npm install pdfkit
```

### **Issue 3: Gmail Authentication Failed**
**Error:** `Invalid login` or `Authentication failed`

**Solution:**
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password (not regular password)
3. Use App Password in `.env` file

### **Issue 4: Email Going to Spam**
**Symptom:** Email sent but not in inbox

**Solution:**
1. Check spam/junk folder
2. Add sender email to contacts
3. Check Gmail filters

## 📧 **Test Commands:**

### **Test 1: Simple Email (No PDF)**
```bash
node testSimpleEmail.js
```

### **Test 2: Email with PDF**
```bash
node testPDFBill.js
```

### **Test 3: Real Payment Flow**
1. Start backend: `npm run dev`
2. Register with your email
3. Make payment through frontend
4. Check email

## 🔍 **Debug Information:**

### **Check .env File:**
```bash
# Should contain:
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
```

### **Check Package Installation:**
```bash
npm list pdfkit
npm list nodemailer
```

### **Check Backend Logs:**
Look for these messages:
- `🔍 Payment Email Service Debug:`
- `📄 Generating PDF bill...`
- `📤 Attempting to send payment email...`
- `✅ Payment confirmation email sent successfully`

## 🆘 **Still Not Working?**

Run these commands and share the output:
```bash
node testSimpleEmail.js
node testPDFBill.js
```

This will help identify exactly where the issue is occurring.

## 📝 **Quick Fix Steps:**

1. **Install PDFKit:** `npm install pdfkit`
2. **Check .env:** Verify email credentials
3. **Test simple email:** `node testSimpleEmail.js`
4. **Test PDF email:** `node testPDFBill.js`
5. **Check spam folder:** Look for emails there 