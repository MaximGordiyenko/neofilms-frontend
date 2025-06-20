module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    // 'react-app',
    // 'react-app/jest',
    // 'plugin:react/recommended',
    // 'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
  },
};
