function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]).{8,}$/;
    return passwordRegex.test(password);
  }
  
  function validateName(name) {
    return name.trim() !== '';
  }
  
  function validateCountry(country) {
    return country !== '';
  }
  
  function validateGender(gender) {
    return gender === 'Male' || gender === 'Female' || gender === 'Other';
  }
  
  module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateCountry,
    validateGender,
  };
  