const nodemailer = require('nodemailer');
const { generatePaymentBillPDF, cleanupTempPDF } = require('./pdfService');

// Create transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Email template for user registration
const createRegistrationEmailTemplate = (userData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Our Service</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .welcome-message { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Our Service!</h1>
        </div>
        
        <div class="content">
          <h2>Hello ${userData.name},</h2>
          
          <div class="welcome-message">
            <h3>🎉 Registration Successful!</h3>
            <p>Thank you for registering with our service platform. Your account has been created successfully.</p>
            
            <h4>Account Details:</h4>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Location:</strong> ${userData.location}</p>
            <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>You can now:</p>
          <ul>
            <li>Browse our services</li>
            <li>Book appointments</li>
            <li>Make payments securely</li>
            <li>Track your service history</li>
          </ul>
          
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing our services!</p>
          <p>Best regards,<br>Your Service Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email template for payment confirmation
const createPaymentEmailTemplate = (userData, paymentData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .payment-details { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .amount { font-size: 24px; font-weight: bold; color: #4CAF50; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Confirmation</h1>
        </div>
        
        <div class="content">
          <h2>Hello ${userData.name},</h2>
          
          <p>Thank you for your payment! Your transaction has been successfully processed.</p>
          
          <div class="payment-details">
            <h3>Payment Details:</h3>
            <p><strong>Service:</strong> ${paymentData.serviceName}</p>
            <p><strong>Servicer:</strong> ${paymentData.servicerName}</p>
            <p><strong>Amount:</strong> <span class="amount">${paymentData.amount}</span></p>
            <p><strong>Payment Method:</strong> ${paymentData.paymentMethod}</p>
            <p><strong>Transaction Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="color: #4CAF50; margin: 0 0 10px 0;">📄 Payment Bill Attached</h4>
            <p style="margin: 0;">A detailed PDF bill has been attached to this email for your records.</p>
          </div>
          
          <p>Our service provider will contact you soon to schedule your service appointment.</p>
          
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing our services!</p>
          <p>Best regards,<br>Your Service Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send registration confirmation email
const sendRegistrationConfirmation = async (userData) => {
  try {
    console.log('🔍 Email Service Debug:');
    console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
    console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
    console.log('📨 To:', userData.email);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ Email credentials not configured!');
      return { success: false, error: 'Email credentials not configured' };
    }
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userData.email,
      subject: 'Welcome to Our Service - Registration Successful',
      html: createRegistrationEmailTemplate(userData)
    };
    
    console.log('📤 Attempting to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Registration confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending registration confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Send payment confirmation email with PDF bill
const sendPaymentConfirmation = async (userData, paymentData) => {
  let pdfFilepath = null;
  
  try {
    console.log('🔍 Payment Email Service Debug:');
    console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
    console.log('🔑 EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');
    console.log('📨 To:', userData.email);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ Email credentials not configured!');
      return { success: false, error: 'Email credentials not configured' };
    }
    
    // Generate PDF bill
    console.log('📄 Generating PDF bill...');
    const pdfResult = await generatePaymentBillPDF(userData, paymentData);
    pdfFilepath = pdfResult.filepath;
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userData.email,
      subject: 'Payment Confirmation - Service Booking',
      html: createPaymentEmailTemplate(userData, paymentData),
      attachments: [
        {
          filename: pdfResult.filename,
          path: pdfResult.filepath,
          contentType: 'application/pdf'
        }
      ]
    };
    
    console.log('📤 Attempting to send payment email with PDF...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Payment confirmation email with PDF sent successfully:', result.messageId);
    
    // Clean up PDF file after sending
    cleanupTempPDF(pdfFilepath);
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending payment confirmation email:', error);
    
    // Clean up PDF file if it exists
    if (pdfFilepath) {
      cleanupTempPDF(pdfFilepath);
    }
    
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPaymentConfirmation,
  sendRegistrationConfirmation
}; 