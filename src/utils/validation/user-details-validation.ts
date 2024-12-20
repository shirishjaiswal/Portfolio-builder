const email = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  return true;
};

const password = (password: string) => {
  const minLength = 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasLowercase &&
    hasUppercase &&
    hasDigit &&
    hasSymbol
  );
};

const phoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(phoneNumber);
};

const UserDetailsValidation = {
  email,
  password,
  phoneNumber,
};

export default UserDetailsValidation;