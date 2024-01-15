// CertificateGenerator.jsx
import React from 'react';
import jsPDF from 'jspdf';
import img from '../assets/certificate-background.png';
import signatureImg from '../assets/Signiture.png';

export async function generateCertificate(name, course, instructor) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [297, 210],
  });

  doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  doc.setFontSize(48);
  doc.setTextColor(162, 123, 66);
  doc.setFont('helvetica');
  const recipientNameTextWidth = doc.getStringUnitWidth(name) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const recipientPosition = 70 + (225 - 70) / 2 - recipientNameTextWidth / 2;
  doc.text(name, recipientPosition, 103, { align: 'left' });

  doc.setFontSize(20);
  doc.setTextColor(162, 123, 66);
  const courseTextWidth = doc.getStringUnitWidth(course) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const coursePosition = 140 + (245 - 140) / 2 - courseTextWidth / 2;
  doc.text(course, coursePosition, 117, { align: 'left' });

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  const instructorTextWidth = doc.getStringUnitWidth(instructor) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const centerPosition = 170 + (228 - 170) / 2 - instructorTextWidth / 2;
  doc.text(instructor, centerPosition, 167, { align: 'center' });

  const signatureImgDataUrl = await toDataUrl(signatureImg);
  const signatureWidth = 50;
  const signatureHeight = 50;
  const signatureHorizontalPosition = 140 + (228 - 140) / 2 - signatureWidth / 2;
  doc.addImage(signatureImgDataUrl, 'PNG', signatureHorizontalPosition, 135, signatureWidth, signatureHeight);

  const serialNumber = Math.floor(Math.random() * 1000000);
  doc.setFontSize(11.3);
  doc.setTextColor(0, 0, 0); 
  doc.text(`Batch_55-${serialNumber}`, 85, 158, { align: 'left' });

  doc.save(`${name}-${course}.pdf`);
}

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
      <button onClick={() => generateCertificate(props.name, props.course, props.instructor)}>
        Generate Certificate
      </button>
    </div>
  );
}

export default CertificateGenerator;
