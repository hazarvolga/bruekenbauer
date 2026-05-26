/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Scope list — extend as the project grows
    "scope-enum": [
      2,
      "always",
      [
        "app",
        "components",
        "layout",
        "motion",
        "product",
        "rfq",
        "data",
        "lib",
        "styles",
        "ci",
        "docker",
        "deps",
        "docs",
        "e2e",
        "config",
        "release",
      ],
    ],
    "header-max-length": [2, "always", 60],
    "subject-case": [2, "always", "lower-case"],
    "body-max-line-length": [1, "always", 100],
  },
};
