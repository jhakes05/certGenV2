import React from 'react';
import jsPDF from 'jspdf';
import img from '../assets/certificate-background.png';
import signatureImg from '../assets/Signiture.png'; // Replace with the actual path to your signature image

const generateCertificate = async (name, course, instructor) => {
  // Create a new jsPDF instance
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm', // Set unit to millimeters
    format: [297, 210], // Set A4 paper size (landscape)
  });

  // Add background image
  doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  // Add recipient name
  doc.setFontSize(48);
  doc.setTextColor(162, 123, 66);
  doc.setFont('helvetica'); // Change the font family and style
  const recipientNameTextWidth = doc.getStringUnitWidth(name) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const recipientPosition = 70 + (225 - 70) / 2 - recipientNameTextWidth / 2;
  doc.text(name, recipientPosition, 103, { align: 'left' }); // 105 and 160: horizontal and vertical positions of the text

  // Add course name
  doc.setFontSize(20);
  doc.setTextColor(162, 123, 66);
  const courseTextWidth = doc.getStringUnitWidth(course) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const coursePosition = 140 + (245 - 140) / 2 - courseTextWidth / 2;
  doc.text(course, coursePosition, 117, { align: 'left' }); // 105 and 195: horizontal and vertical positions of the text

   // Add instructor name
  // Calculate the center position
  doc.setFontSize(14); // Set font size to 14
  doc.setTextColor(0, 0, 0);
  const instructorTextWidth = doc.getStringUnitWidth(instructor) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const centerPosition = 170 + (228 - 170) / 2 - instructorTextWidth / 2;
  doc.text(instructor, centerPosition, 167, { align: 'center' });

  // Add signature image
  const signatureImgDataUrl = await toDataUrl(signatureImg);
  const signatureWidth = 50;
  const signatureHeight = 50;
  const signatureHorizontalPosition = 140 + (228 - 140) / 2 - signatureWidth / 2; // Adjusted the horizontal position
  doc.addImage(signatureImgDataUrl, 'PNG', signatureHorizontalPosition, 135, signatureWidth, signatureHeight);

   // Add random serial number
   const serialNumber = Math.floor(Math.random() * 1000000);
   doc.setFontSize(11.3);
   doc.setTextColor(0, 0, 0); 
   doc.text(`Batch_55-${serialNumber}`, 85, 158, { align: 'left' });


  // Save the PDF
  doc.save(`${name}-${course}.pdf`);
};

function toDataUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function CertificateGenerator(props) {
  return (
    <div>
      <button onClick={() => generateCertificate(props.name, props.course, props.instructor)}>Generate Certificate</button>
    </div>
  );
}

export default CertificateGenerator;
