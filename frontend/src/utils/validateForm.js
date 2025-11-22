// Basic validators for form fields with error messages
export const validators = {
  required: (value) => (value ? null : 'This field is required'),

  email: (value) => {
    if (!value) return 'Email is required';
    // Simple regex for basic email validation
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
  },

  minLength: (min) => (value) =>
    value && value.length >= min ? null : `Must be at least ${min} characters`,

  passwordMatch: (password, confirmPassword) =>
    password === confirmPassword ? null : "Passwords don't match",
};

// Example combined validation
export function validate(fields, values) {
  const errors = {};

  Object.entries(fields).forEach(([name, rules]) => {
    for (const rule of rules) {
      const errorMessage = rule(values[name], values);
      if (errorMessage) {
        errors[name] = errorMessage;
        break;
      }
    }
  });

  return errors;
}

// Usage:
// const errors = validate({
//   email: [validators.required, validators.email],
//   password: [validators.required, validators.minLength(6)],
//   confirmPassword: [ (val, values) => validators.passwordMatch(values.password, val) ],
// }, formValues);
