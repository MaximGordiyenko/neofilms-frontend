import * as Yup from 'yup';

export const loginSchema = Yup.object({
  login: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[^\s@]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
      'Email must be from a valid domain'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
    .matches(/[@$!%*?&]+/, 'Password must contain at least one special character')
    .required('Password is required')
});
