/*
 * @Date: 2023-01-03 23:40:11
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-09 23:09:33
 * @FilePath: /search/nuxt.config.ts
 */
export default defineNuxtConfig({
  css: ['@unocss/reset/normalize.css', '@/assets/styles/base.scss'],
  modules: ['@unocss/nuxt', '@nuxtjs/color-mode', '@element-plus/nuxt', '@vueuse/nuxt'],
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    shortcuts: [
      {
        'icon-btn': 'cursor-pointer text-slate-900 dark:text-slate-200',
      },
    ],
    rules: [],
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
})
