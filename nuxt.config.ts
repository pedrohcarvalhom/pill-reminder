// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/color-mode', '@nuxtjs/eslint-module', '@nuxtjs/i18n', 'shadcn-nuxt', 'nuxt-icon'],
  i18n: {
    vuei18n: './i18n.config.ts',
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
  },
  colorMode: {
    classSuffix: ''
  },
  shadcn: {
    componentDir: './components/ui'
  },
})