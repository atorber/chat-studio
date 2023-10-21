module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        // node环境
		node: true
    },
    "extends": [
        "eslint:recommended",
        // "plugin:@typescript-eslint/recommended",
        // "plugin:vue/vue3-essential",
        'plugin:vue/vue3-strongly-recommended', 
        'airbnb-base', 
        'prettier'
    ],
    "parser": 'vue-eslint-parser',
    overrides: [
        {
          env: {
            node: true,
          },
          files: [".eslintrc.{js,cjs}"],
          parserOptions: {
            sourceType: "script",
          },
        },
      ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module",
        		// 额外的语言类型
		"ecmaFeatures": {
			tsx: true,
			jsx: true,
		},
    },
      // 全局自定义的宏，这样在源文件中使用全局变量就不会报错或者警告
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefault: 'readonly',
	},
    "plugins": [
        "@typescript-eslint",
        "vue",
        'unused-imports',
    ],
    settings: {
		// 设置项目内的别名
		'import/resolver': {
			alias: {
				map: [
                    ['@', './src'],
                    ['/assets', './src/assets']
                ],
        extensions: [
            '.ts', 
            '.js', 
            'tsx', 
            'jsx',
            '.vue', 
            '.less'] // 解决：Unable to resolve path to module
			},
      // "node": {
      //   "extensions": [".js", ".jsx", ".ts", ".tsx"]
      // }
		},
		// 允许的扩展名
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
	},
    rules: {
        "vue/require-prop-types":"off",
        "vue/prop-name-casing":"off",
        "no-new":"off",
        "no-bitwise":"off",
        "no-continue":"off",
        "no-plusplus":"off",
        "no-empty":"off",
        "radix":"off",
        "no-return-assign":"off",
        "no-unused-expressions":"off",
        "import/prefer-default-export": "off",
        "no-restricted-syntax": "off",
        "no-param-reassign": "off",
        "camelcase": "off",
        'no-console': 0,   // 项目中可以使用console.log()
            'vue/valid-template-root': 0,
        'import/no-extraneous-dependencies': 0,   // 解决vite.config.ts的引入报错
            'vue/multi-word-component-names': 0,
            'vue/attribute-hyphenation': 0,
            'vue/v-on-event-hyphenation': 0,
            // 'eslint-plugin-unused-vars': 0,
            "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
            ],
        "func-names": 0,    // 关闭匿名函数的校验
        "import/extensions": 0,   // import时省略后缀名
        "vue/no-mutating-props": 0,  // 关闭子组件改变props时的报错  baseForm
        'no-undef': 0,  // 解决按需导入ElMessage  未定义的问题
        //  already declared in the upper scope
        "no-shadow": 0,
        "spaced-comment":0,
        "import/newline-after-import": 0, 
        "import/no-unresolved":0,
        "import/no-named-as-default":0,
        "import/no-named-as-default-member":0,
        "import/no-relative-packages":0,
        "import/no-cycle":0,
        "import/no-self-import":0,
        "import/order":0,
        "import/no-duplicates":0
      },
}
