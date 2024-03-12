// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
    'nuxt-icon',
    'nuxt-primevue',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
  },
  colorMode: {
    classSuffix: ''
  },
  shadcn: {
    componentDir: './components/ui'
  },
  primevue: {
    components: {
      prefix: 'Prime',
      include: '*',
      exclude: ['Galleria', 'Carousel']
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities'
  },
  css: ['primevue/resources/themes/aura-light-pink/theme.css']
})