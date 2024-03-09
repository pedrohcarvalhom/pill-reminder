import pt from './locales/pt.json'
import en from './locales/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt',
  messages: {
    en: en,
    pt: pt,
  }
}))
