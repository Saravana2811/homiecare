# Email Setup Guide

## Prerequisites
1. Install nodemailer: `npm install nodemailer`
2. Create a `.env` file in the backend directory

## Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
3. Copy the generated password

## Environment Variables
Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/serviceapp
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
PORT=5000
```

## Important Notes
- Use your Gmail address for `EMAIL_USER`
- Use the app password (not your regular Gmail password) for `EMAIL_PASSWORD`
- Never commit the `.env` file to version control
- The email will be sent to the registered user's email address when they complete payment

## Testing
1. Start the backend server: `npm run dev`
2. Make sure a user is logged in (has a valid JWT token)
3. Complete a payment through the frontend
4. Check the user's email for the payment confirmation 