// ──────────────────────────────────────────────
//  Feature flags are configured in .env.local:
//    VITE_ROUTER_ENABLED  = true | false
//    VITE_PINIA_ENABLED   = true | false
//    VITE_I18N_ENABLED    = true | false
// ──────────────────────────────────────────────

import { createApp } from 'vue'
import './style.css'

const ROUTER = import.meta.env.VITE_ROUTER_ENABLED === 'true'
const PINIA = import.meta.env.VITE_PINIA_ENABLED === 'true'
const I18N = import.meta.env.VITE_I18N_ENABLED !== 'false'

const init = async () => {
  const App = (await import(ROUTER ? './App.vue' : './_App.simple.vue')).default
  const app = createApp(App)

  if (ROUTER) {
    const router = (await import('./router')).default
    app.use(router)
  }

  if (PINIA) {
    const pinia = (await import('./utils/pinia')).default
    app.use(pinia)
  }

  if (I18N) {
    const { localesPlugin } = await import('./locales')
    app.use(localesPlugin)
  }

  app.mount('#app')
}

init()
