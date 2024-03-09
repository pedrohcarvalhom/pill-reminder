// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/color-mode', '@nuxtjs/eslint-module', '@nuxtjs/i18n', 'shadcn-nuxt'],
  i18n: {
    vuei18n: './i18n.config.ts',
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
  },
  colorMode: {
    classSuffix: ''
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
})