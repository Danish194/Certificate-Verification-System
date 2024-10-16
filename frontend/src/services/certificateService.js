import axios from 'axios';

// Upload Excel file
export const uploadExcelFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data } = await axios.post('/api/certificates/upload', formData, config);
  return data;
};

// Fetch certificate by ID
export const fetchCertificate = async (certificateId) => {
  const { data } = await axios.get(`/api/certificates/${certificateId}`);
  return data;
};

// Download certificate as PDF
export const downloadCertificate = async (certificateId) => {
  const { data } = await axios.get(`/api/certificates/${certificateId}/download`, {
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${certificateId}.pdf`);
  document.body.appendChild(link);
  link.click();
};
