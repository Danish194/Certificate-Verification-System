import React, { useState } from "react";
import axios from "axios";
import CertificateTemplate from "../components/CertificateTemplate";

const StudentPortal = () => {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/certificates/${certificateId}`);
      setCertificate(response.data);
    } catch (error) {
      alert("Certificate not found");
    }
  };

  return (
    <div>
      <h2>Student Portal</h2>
      <input
        type="text"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
        placeholder="Enter Certificate ID"
      />
      <button onClick={handleSearch}>Search</button>

      {certificate && <CertificateTemplate certificate={certificate} />}
    </div>
  );
};

export default StudentPortal;
