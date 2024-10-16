import React from "react";

const CertificateTemplate = ({ certificate }) => {
  return (
    <div className="certificate-template">
      <h1>Certificate of Internship</h1>
      <h2>{certificate.studentName}</h2>
      <p>Internship Domain: {certificate.internshipDomain}</p>
      <p>Start Date: {certificate.startDate}</p>
      <p>End Date: {certificate.endDate}</p>
    </div>
  );
};

export default CertificateTemplate;
