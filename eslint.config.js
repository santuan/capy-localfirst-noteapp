import pluginVue from 'eslint-plugin-vue'
export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    rules: {
      // override/add rules settings here, such as:
      'vue/multi-word-component-names': 'off',
      'vue/valid-define-props': 'off',
      'vue/valid-define-emits': 'off'
    }
  }
]