export const isEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isEmpty = (value) => {
  return value === undefined ||
         value === null ||
         value.toString().trim() === "";
};

export const minLength = (value, len) => {
  return value && value.length >= len;
};

export const maxLength = (value, len) => {
  return value && value.length <= len;
};

// ======================
// PASSWORD VALIDATION
// ======================

export const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

// ======================
// GENERIC VALIDATOR
// ======================

export const validateFields = (fields) => {
  const errors = {};

  Object.keys(fields).forEach((key) => {
    if (isEmpty(fields[key])) {
      errors[key] = `${key} is required`;
    }
  });

  return errors;
};