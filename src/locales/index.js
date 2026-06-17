import { language } from '../utils/language'

import en from './en.json'
import err from './err.json'

const locales = {
  en,
}

export const getLocale = (page) => {
  if (page === 'err') {
    return err[language.value]
  }

  return locales[language.value][page]
}

export const localesPlugin = {
  install(app) {
    app.config.globalProperties.$t = getLocale
    app.provide('$t', getLocale)
  },
}
