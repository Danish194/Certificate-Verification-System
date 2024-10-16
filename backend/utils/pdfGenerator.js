import PDFDocument from 'pdfkit';
import streamBuffers from 'stream-buffers';

export const generateCertificatePDF = async (certificate) => {
  const doc = new PDFDocument();
  const pdfStream = new streamBuffers.WritableStreamBuffer({
    initialSize: (100 * 1024),
    incrementAmount: (10 * 1024)
  });

  // PDF content
  doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).text(`This certifies that ${certificate.studentName}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`Successfully completed an internship in ${certificate.internshipDomain}`, { align: 'center' });
  doc.moveDown();
  doc.text(`From: ${new Date(certificate.startDate).toDateString()}`, { align: 'center' });
  doc.text(`To: ${new Date(certificate.endDate).toDateString()}`, { align: 'center' });
  doc.end();

  doc.pipe(pdfStream);

  return new Promise((resolve, reject) => {
    pdfStream.on('finish', () => {
      resolve(pdfStream.getContents());
    });
    pdfStream.on('error', reject);
  });
};
