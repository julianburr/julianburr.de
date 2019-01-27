module.exports = {
  env: {
    browser: true,
    es6: true
  },
  plugins: ["react"],
  globals: {
    graphql: false
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      destructuring: true,
      spread: true
    }
  },
  rules: {
    "no-console": ["error"]
  }
};
