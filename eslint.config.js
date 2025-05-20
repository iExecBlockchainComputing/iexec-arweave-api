import pluginJs from '@eslint/js';
import globals from 'globals';
import pluginTs from 'typescript-eslint';
// import pluginUnicorn from 'eslint-plugin-unicorn';

// https://typescript-eslint.io/getting-started
export default pluginTs.config(
  pluginJs.configs.recommended,
  pluginTs.configs.recommended,
  {
    files: ['src/**/*.ts', 'tests/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'error',
    },
  }
);
