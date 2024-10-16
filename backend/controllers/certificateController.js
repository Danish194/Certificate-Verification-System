import asyncHandler from 'express-async-handler';
import xlsx from 'xlsx';
import { Certificate } from '../models/Certificate.js';
import { generateCertificatePDF } from '../utils/pdfGenerator.js';

// Upload and process Excel file
export const uploadCertificateData = asyncHandler(async (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Store data in MongoDB
    await Certificate.insertMany(data);

    res.status(201).json({ message: 'Data uploaded successfully' });
});

// Retrieve certificate details by ID
export const getCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
        res.status(404);
        throw new Error('Certificate not found');
    }

    res.json(certificate);
});

// Generate and download certificate PDF
export const downloadCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
        res.status(404);
        throw new Error('Certificate not found');
    }

    const pdfBuffer = await generateCertificatePDF(certificate);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${certificateId}.pdf`);
    res.send(pdfBuffer);
});
