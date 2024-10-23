import React from 'react';

const CertificateTemplate = ({ certificate }) => {
  return (
    <div className="certificate">
      <h1>Certificate of Completion</h1>
      <p>This certifies that <strong>{certificate.studentName}</strong></p>
      <p>Has completed an internship in <strong>{certificate.internshipDomain}</strong></p>
      <p>From {new Date(certificate.startDate).toLocaleDateString()} to {new Date(certificate.endDate).toLocaleDateString()}</p>
    </div>
  );
};

export default CertificateTemplate;