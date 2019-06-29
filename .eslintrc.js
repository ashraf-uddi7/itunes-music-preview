module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    "cypress/globals": true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    "eslint:recommended",
    'prettier',
    'prettier/vue'
  ],
  plugins: [
    'prettier',
    "cypress"
  ],
  // add your custom rules here
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: "babel-eslint"
  }
}
