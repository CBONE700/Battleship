import js from '@eslint/js';
import jest from 'eslint-plugin-jest';

export default [
  js.configs.recommended,

  // Ignore compiled files
  {
    ignores: ['dist/**'],
  },

  // Webpack config (Node environment)
  {
    files: ['webpack.config.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
      },
    },
  },

  // Test files (Jest)
  {
    files: ['tests/**/*.js', '**/*.test.js'],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },

  // Default JS files
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
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
