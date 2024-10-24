import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js does not need React import
      '@typescript-eslint/no-unused-vars': 'off', // Disable no-unused-vars for now
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
