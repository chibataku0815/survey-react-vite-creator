module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // アロー関数でコンポーネントを定義できるようにする
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-param-reassign': [2, { props: false }],
    // jsxの記法を許可する拡張子を設定
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    // 開発するのに邪魔なルールをoffにする
    'react-hooks/rules-of-hooks': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'react/button-has-type': 'off',
    'no-unused-vars': 'off',
    // アンダースコアから始まる引数は使用しなくてもエラーにならない
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'implicit-arrow-linebreak': 'off',
    'react/require-default-props': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 'off',
    'react/jsx-wrap-multilines': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        // devDependenciesのimportを許可
        devDependencies: true,
        optionalDependencies: false,
      },
    ],
    'object-curly-newline': ['error', { consistent: true }],
    // スプレッド構文でpropsを渡すことを許可
    'react/jsx-props-no-spreading': 'off',
    'arrow-body-style': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-shadow': 'off',
    'comma-spacing': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};
