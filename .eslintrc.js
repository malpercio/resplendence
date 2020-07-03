module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn"
  },
  parserOptions: {
    ecmaVersion: 6,
  }
};
