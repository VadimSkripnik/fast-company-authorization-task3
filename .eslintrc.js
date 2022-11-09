module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        semi: [2, "always"],
        indent: [0, 4],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "react/jsx-no-undef": ["off"],
        "multiline-ternary": ["off"],
        "no-undef": ["off"],
        "no-unused-vars": ["off"],
        "no-multiple-empty-lines": ["off"],
        "no-trailing-spaces": ["off"],
        "no-empty": ["off"],
        "keyword-spacing": ["off"],
        "space-unary-ops": ["off"],
        "no-useless-return": ["off"],
        "spaced-comment": ["off"],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
                avoidEscape: true
            }
        ]
    }
};
