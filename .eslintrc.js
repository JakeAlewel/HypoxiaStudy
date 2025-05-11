module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    '@react-native',
    "prettier",
    "eslint-config-airbnb-base",
    "eslint-config-prettier",
  ],
  "plugins": [
    "eslint-plugin-prettier"
  ],
   "rules": {
    "prettier/prettier": ["error", {}],
    "max-len": 120,
   },
};
