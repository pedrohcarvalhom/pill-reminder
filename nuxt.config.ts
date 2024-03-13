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
    '@nuxtjs/supabase'
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
      exclude: ['Galleria', 'Carousel', 'Editor', 'Chart']
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities'
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      cookieRedirect: false
    }
  },
  css: ['primevue/resources/themes/aura-light-pink/theme.css']
})