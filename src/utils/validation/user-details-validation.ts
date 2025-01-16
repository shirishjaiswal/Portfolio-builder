const validateName = (name: string) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const isValid = name.trim().length > 0 && nameRegex.test(name);
  return isValid
    ? { isValid: true, warning: "" }
    : {
        isValid: false,
        warning: "Enter a valid name (letters and spaces only)",
      };
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
    ? { isValid: true, warning: "" }
    : { isValid: false, warning: "Enter a valid email address" };
};

const validateRequiredField = (field: string) => {
  return field.length > 0
    ? { isValid: true, warning: "" }
    : { isValid: false, warning: "Field is required" };
};

const validatePassword = (password: string) => {
  const minLength = 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid =
    password.length >= minLength &&
    hasLowercase &&
    hasUppercase &&
    hasDigit &&
    hasSymbol;

  return isValid
    ? { isValid: true, warning: "" }
    : {
        isValid: false,
        warning:
          "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character",
      };
};

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(phoneNumber)
    ? { isValid: true, warning: "" }
    : { isValid: false, warning: "Enter a valid 10-digit phone number" };
};

const UserDetails = {
  validateName,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateRequiredField,
};

export default UserDetails;
