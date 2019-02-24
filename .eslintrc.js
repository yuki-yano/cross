"use strict"

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    jest: true
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    jsx: true,
    project: "tsconfig.json"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx"]
      }
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    }
  },
  rules: {
    // never型の処理にconsole.debugを使うためにdebugを許容
    // precommitとCIでは .eslintrc.strict.js を使って console.log を確認する
    "no-console": "off",

    "prettier/prettier": "error",

    // console.debugのエラーを抑制
    "node/no-unsupported-features/node-builtins": ["error", { version: ">=10.0.0" }],

    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": ["error", { tryExtensions: [".js", ".ts", ".tsx"] }],

    "react/prop-types": "off",

    "no-unused-vars": "off",
    // "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],

    camelcase: "off",
    "@typescript-eslint/camelcase": ["error", { properties: "always", ignoreDestructuring: false }],

    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",

    "@typescript-eslint/array-type": ["error", "generic"],
    "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/restrict-plus-operands": "error"
  },
  overrides: [
    {
      files: ["webpack.*.js"],
      rules: {
        "node/no-unpublished-require": "off",
        "node/no-missing-require": "off"
      }
    }
  ]
}
