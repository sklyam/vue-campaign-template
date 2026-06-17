# Vue Campaign Template

A Vue 3 mobile campaign page boilerplate with modular feature toggles.

## Quick Start

```bash
npm install
npm run dev
```

## Feature Flags

Configure `VITE_*` in `.env.local`:

| Flag | Default | Description |
|------|---------|-------------|
| `VITE_ROUTER_ENABLED` | `true` | vue-router mode / simple component switching |
| `VITE_I18N_ENABLED` | `true` | Multi-language support |
| `VITE_PINIA_ENABLED` | `false` | State management (Pinia) |
| `VITE_IMAGEMIN_ENABLED` | `false` | Image compression (requires optional deps) |
| `VITE_VISUALIZER_ENABLED` | `false` | Bundle analysis |

## Optional Dependencies

```bash
# Image optimization
npm install @vheemstra/vite-plugin-imagemin imagemin-mozjpeg imagemin-pngquant imagemin-webp

# Bundle analysis
npm install rollup-plugin-visualizer
```

## Event Duration

Set `VITE_START_TIME` and `VITE_END_TIME` in `.env.local` to automatically show a Coming Soon / Event Ended page based on the current time.

## Project Structure

```
src/
├── main.js              # Entry (auto-selects router or simple mode)
├── App.vue              # Router mode (uses <RouterView>)
├── _App.simple.vue      # Simple mode (component switching)
├── api/                 # API layer
├── components/          # Reusable components
├── constants/           # Constants
├── locales/             # i18n
├── router/              # Vue Router
├── stores/              # State
├── utils/               # Utilities
├── views/               # Page views
└── style.css            # Global styles
```
