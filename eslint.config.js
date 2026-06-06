import firebaseRulesPlugin from "@firebase/eslint-plugin-security-rules";

export default [
  {
    ignores: ["dist/**/*", "node_modules/**/*"]
  },
  {
    plugins: {
      firebase: firebaseRulesPlugin
    },
    ...firebaseRulesPlugin.configs["flat/recommended"]
  }
];
