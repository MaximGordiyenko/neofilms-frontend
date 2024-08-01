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
    .matches(/[0-9]+/, 'Password must contain at least one digit')
    .matches(/[@$!%\\*\\?&]+/, 'Password must contain at least one special character')
    .required('Password is required')
});

export const checkPassword = Yup.object({
  new_password: Yup.string()
    .min(8, 'New Password must be at least 8 characters long')
    .matches(/[a-z]+/, 'New Password must contain at least one lowercase letter')
    .matches(/[A-Z]+/, 'New Password must contain at least one uppercase letter')
    .matches(/[0-9]+/, 'New Password must contain at least one digit')
    .matches(/[@$!%*?&]+/, 'New Password must contain at least one special character')
    .required('New Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Confirm Password must match New Password')
    .required('Confirm Password is required')
});
