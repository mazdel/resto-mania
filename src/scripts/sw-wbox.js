// sw-wbox.js
import { registerRoute, NavigationRoute } from 'workbox-routing';
import {
  StaleWhileRevalidate,
  NetworkFirst,
  CacheFirst,
} from 'workbox-strategies';
import CONFIG from './globals/config';
import API_ENDPOINT from './globals/api-endpoint';

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: 'navigations',
  }),
);

registerRoute(navigationRoute);

/* eslint-disable no-restricted-globals */
self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  const isFromOrigin = url.origin === location.origin;
  if (isFromOrigin && url.pathname.startsWith('/images/')) {
    event.respondWith(
      new CacheFirst({
        cacheName: 'local-image',
      }).handle({ event, request }),
    );
  }

  if (isFromOrigin && url.pathname.startsWith('/styles/')) {
    event.respondWith(
      new CacheFirst({
        cacheName: 'local-styles',
      }).handle({ event, request }),
    );
  }

  const endpoints = Object.values(API_ENDPOINT).map(
    (endpoint) => new URL(endpoint).origin,
  );
  const isRegisteredApi = endpoints.includes(url.origin);
  if (isRegisteredApi && request.destination !== 'image') {
    event.respondWith(
      new StaleWhileRevalidate({
        cacheName: 'api-data',
      }).handle({ event, request }),
    );
  }

  const imageBases = Object.values(CONFIG.BASE_IMG_PATH).map(
    (base) => new URL(base).origin,
  );
  const isRegisteredBaseIMG = imageBases.includes(url.origin);
  if (isRegisteredBaseIMG && request.destination === 'image') {
    event.respondWith(
      new StaleWhileRevalidate({
        cacheName: 'remote-image',
      }).handle({ event, request }),
    );
  }

  const styleProviders = ['https://fonts.googleapis.com'].map(
    (provider) => new URL(provider).origin,
  );
  if (styleProviders.includes(url.origin)) {
    event.respondWith(
      new StaleWhileRevalidate({
        cacheName: 'remote-styles',
      }).handle({ event, request }),
    );
  }

  console.log(request);
});
/* eslint-enable */
