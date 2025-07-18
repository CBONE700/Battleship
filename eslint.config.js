import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    ignores: ['dist/**'],
  },

  {
    files: ['webpack.config.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        ...globals.node,
      },
    },
  },

  {
    files: ['tests/**/*.js', '**/*.test.js'],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser, // ✅ FIX: includes `alert`, `window`, `document`, etc.
      },
    },
    rules: {
      semi: ['error', 'always'],
      indent: ['error', 2],
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'comma-dangle': ['error', 'only-multiline'],
    },
  },
];
