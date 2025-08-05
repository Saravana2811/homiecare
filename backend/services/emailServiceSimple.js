const nodemailer = require('nodemailer');

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

// Simple payment email template (without PDF)
const createSimplePaymentEmailTemplate = (userData, paymentData) => {
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

// Send simple payment confirmation email (without PDF)
const sendSimplePaymentConfirmation = async (userData, paymentData) => {
  try {
    console.log('🔍 Simple Payment Email Service Debug:');
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
      subject: 'Payment Confirmation - Service Booking',
      html: createSimplePaymentEmailTemplate(userData, paymentData)
    };
    
    console.log('📤 Attempting to send simple payment email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Simple payment confirmation email sent successfully:', result.messageId);
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending simple payment confirmation email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendSimplePaymentConfirmation
}; 