const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Generate PDF bill
const generatePaymentBillPDF = (userData, paymentData) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });

      // Create unique filename
      const timestamp = Date.now();
      const filename = `payment_bill_${paymentData.transactionId}_${timestamp}.pdf`;
      const filepath = path.join(__dirname, '../temp', filename);

      // Ensure temp directory exists
      const tempDir = path.join(__dirname, '../temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Pipe PDF to file
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Add company header
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .fillColor('#4CAF50')
         .text('Service Provider', { align: 'center' });
      
      doc.fontSize(14)
         .font('Helvetica')
         .fillColor('#666')
         .text('Professional Home Services', { align: 'center' });
      
      doc.moveDown(0.5);

      // Add bill title
      doc.fontSize(20)
         .font('Helvetica-Bold')
         .fillColor('#333')
         .text('PAYMENT BILL', { align: 'center' });
      
      doc.moveDown(1);

      // Add bill details
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor('#333')
         .text('Bill Details:');
      
      doc.moveDown(0.5);

      // Bill information table
      const billInfo = [
        ['Bill Date:', new Date().toLocaleDateString()],
        ['Transaction ID:', paymentData.transactionId],
        ['Payment Method:', paymentData.paymentMethod]
      ];

      billInfo.forEach(([label, value]) => {
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#333')
           .text(`${label} ${value}`);
      });

      doc.moveDown(1);

      // Customer information
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor('#333')
         .text('Customer Information:');
      
      doc.moveDown(0.5);

      const customerInfo = [
        ['Name:', userData.name],
        ['Email:', userData.email],
        ['Location:', userData.location]
      ];

      customerInfo.forEach(([label, value]) => {
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#333')
           .text(`${label} ${value}`);
      });

      doc.moveDown(1);

      // Service details
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor('#333')
         .text('Service Details:');
      
      doc.moveDown(0.5);

      const serviceInfo = [
        ['Service:', paymentData.serviceName],
        ['Service Provider:', paymentData.servicerName]
      ];

      serviceInfo.forEach(([label, value]) => {
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#333')
           .text(`${label} ${value}`);
      });

      doc.moveDown(1);

      // Amount section
      doc.fontSize(16)
         .font('Helvetica-Bold')
         .fillColor('#4CAF50')
         .text(`Total Amount: ${paymentData.amount}`, { align: 'right' });
      
      doc.moveDown(2);

      // Footer
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#666')
         .text('Thank you for choosing our services!', { align: 'center' });
      
      doc.text('For any queries, please contact our support team.', { align: 'center' });

      // Finalize PDF
      doc.end();

      stream.on('finish', () => {
        resolve({ filepath, filename });
      });

      stream.on('error', (error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
};

// Clean up temporary PDF files
const cleanupTempPDF = (filepath) => {
  try {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      console.log('✅ Temporary PDF file cleaned up');
    }
  } catch (error) {
    console.error('❌ Error cleaning up PDF file:', error);
  }
};

module.exports = {
  generatePaymentBillPDF,
  cleanupTempPDF
}; 