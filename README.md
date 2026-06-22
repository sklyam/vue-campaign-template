# Vue Campaign Template

A Vue 3 mobile campaign page boilerplate with modular feature toggles.

## Quick Start

```bash
pnpm install
pnpm dev
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
pnpm add @vheemstra/vite-plugin-imagemin imagemin-mozjpeg imagemin-pngquant imagemin-webp

# Bundle analysis
pnpm add rollup-plugin-visualizer
```

## Deployment

### Apache (.htaccess)

The root `.htaccess` provides **automatic WebP fallback**: when a browser requests `.jpg`/`.png`/`.gif` and the corresponding `.webp` file exists, Apache serves the `.webp` instead. Requires `mod_rewrite`, `mod_headers`, and `mod_mime`.

### Nginx

For Vite-built SPAs, nginx is the more common choice. Equivalent WebP config:

```nginx
server {
    listen 80;
    root /path/to/dist;
    index index.html;

    # SPA fallback: all routes → index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # WebP auto-serve
    location ~* \.(jpe?g|png|gif)$ {
        add_header Vary Accept;
        try_files $uri $uri.webp @fallback;
    }
    location ~* \.(jpe?g|png|gif)\.webp$ {
        add_header Content-Type image/webp;
    }
    location @fallback {
        try_files $uri =404;
    }

    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Event Duration

Set `VITE_START_TIME` and `VITE_END_TIME` in `.env.local` to automatically show a Coming Soon / Event Ended page based on the current time.

## Project Structure

```
src/
├── main.js              # Entry (auto-selects router or simple mode)
├── App.vue              # Router mode (uses <RouterView>)
├── _App.simple.vue      # Simple mode (component switching)
├── api/                 # API layer (client.js + service files)
├── components/          # Reusable components
├── constants/           # Constants
├── locales/             # i18n
├── router/              # Vue Router
├── utils/               # Utilities (duration, language, validation)
├── views/               # Page views
└── style.css            # Global styles
```
