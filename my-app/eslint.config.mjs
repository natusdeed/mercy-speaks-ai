/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },
];

export default eslintConfig;
