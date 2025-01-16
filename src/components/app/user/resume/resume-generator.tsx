import React, { useState } from 'react';
import { generate } from '@pdfme/generator';
import { Template, BLANK_PDF } from '@pdfme/common';
import { barcodes, image } from '@pdfme/schemas';

const PdfGenerator = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const template: Template = {
    basePdf: BLANK_PDF,
    schemas: [
      [
        {
          name: 'example_text',
          type: 'text',
          position: { x: 10, y: 10 },
          width: 100,
          height: 10,
        },
      ],
    ],
  };

  const plugins = {
    'QR Code': barcodes.qrcode,
    Image: image,
  };

  const inputs = [
    {
      example_text: 'Hello, World!',
      example_image: 'data:image/png;base64,...', // Base64 image string
      example_qr_code: 'https://pdfme.com/',
    },
  ];

  const generatePdf = async () => {
    const pdf = await generate({ template, inputs, plugins });
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div>
      <button onClick={generatePdf}>Generate PDF</button>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="Generated PDF"
        />
      )}
    </div>
  );
};

export default PdfGenerator;
