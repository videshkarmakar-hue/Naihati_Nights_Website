import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png',
      ],
      manifest: false, // Use the dedicated /public/manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/cdn\.phototourl\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'cdn-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }), {
      name: 'apk-headers-and-proxy',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const targetReleaseUrl = 'https://github.com/videshkarmakar-hue/Naihati-Nights/releases/download/v3.0.39/NaihatiNights-3.0.39.apk';

          if (req.url && (req.url === '/api/check-download' || req.url.startsWith('/api/check-download?'))) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(JSON.stringify({
              url: targetReleaseUrl,
              filename: 'NaihatiNights-3.0.39.apk',
              status: 'ready'
            }));
            return;
          }

          if (req.url && (req.url === '/api/download' || req.url === '/api/download-apk' || req.url.startsWith('/api/download?'))) {
            res.writeHead(302, {
              Location: targetReleaseUrl,
              'Cache-Control': 'no-cache',
              'Access-Control-Allow-Origin': '*'
            });
            res.end();
            return;
          }

          if (req.url && (req.url.startsWith('/downloads/NaihatiNights-3.0.39.apk') || req.url.startsWith('/downloads/NaihatiNights') || req.url.startsWith('/downloads/app-debug.apk'))) {
            const filePath = path.resolve(__dirname, 'public/downloads/NaihatiNights-3.0.39.apk');
            if (fs.existsSync(filePath)) {
              const stat = fs.statSync(filePath);
              res.writeHead(200, {
                'Content-Type': 'application/vnd.android.package-archive',
                'Content-Disposition': 'attachment; filename="NaihatiNights-3.0.39.apk"',
                'Content-Length': stat.size,
                'Cache-Control': 'public, max-age=86400',
                'Access-Control-Allow-Origin': '*'
              });
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }

          if (req.url && req.url.includes('.apk')) {
            res.setHeader('Content-Type', 'application/vnd.android.package-archive');
            res.setHeader('Content-Disposition', 'attachment; filename="NaihatiNights-3.0.39.apk"');
          }
          next();
        });
      },
    }, cloudflare()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});