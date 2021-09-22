module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    // eslint.vue.doc :  https://eslint.vuejs.org/rules/component-name-in-template-casing.html
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      "registeredComponentsOnly": false,
      "ignores": []
    }],
    "vue/prop-name-casing": [1, "camelCase"],
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/attribute-hyphenation": ["error", "always" , {
      "ignore": []
    }],
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }]

    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
