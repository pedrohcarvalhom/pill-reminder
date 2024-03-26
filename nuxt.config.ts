// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, telemetry: true },
  app: {
    head: {
      title: 'Pill Reminder',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Pill Reminder - Lembre-se dos seus remédios' },
      ]
    },
  },
  devServer: {
    port: 3001
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.VITE_BASE_URL,
    }
  },
  modules: [
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
    'nuxt-icon',
    'nuxt-primevue',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    "@nuxt/image"
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
  pinia: {
    storesDirs: ['./stores/**'],
  },
  css: ['primevue/resources/themes/aura-light-pink/theme.css']
})