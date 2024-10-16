export const validateLogin = (data) => {
    if (!data.email || !data.password) {
      return 'Email and password are required';
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return 'Email is invalid';
    }
    if (data.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  };
  
  export const validateCertificateUpload = (file) => {
    const allowedExtensions = ['xls', 'xlsx'];
    const fileExtension = file.name.split('.').pop();
  
    if (!allowedExtensions.includes(fileExtension)) {
      return 'Only Excel files are allowed';
    }
  
    if (file.size > 5 * 1024 * 1024) {
      return 'File size should be less than 5MB';
    }
  
    return null;
  };
  