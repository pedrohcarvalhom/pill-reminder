import pt from './locales/pt-BR.json'
import en from './locales/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt',
  messages: {
    en: en,
    pt: pt,
  }
}))
