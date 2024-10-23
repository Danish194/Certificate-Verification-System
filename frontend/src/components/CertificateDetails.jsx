import React from 'react';

const CertificateDetails = ({ certificate }) => {
  const { certificateID, studentName, internshipDomain, startDate, endDate } = certificate;

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center">Certificate Details</h3>
      <div className="mb-2">
        <strong>Certificate ID:</strong> {certificateID}
      </div>
      <div className="mb-2">
        <strong>Student Name:</strong> {studentName}
      </div>
      <div className="mb-2">
        <strong>Internship Domain:</strong> {internshipDomain}
      </div>
      <div className="mb-2">
        <strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}
      </div>
      <div className="mb-2">
        <strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default CertificateDetails;