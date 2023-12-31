// sw-wbox.js
import { registerRoute, Route } from 'workbox-routing';
import {
  StaleWhileRevalidate,
  NetworkFirst,
  CacheFirst,
} from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import CONFIG from './globals/config';
import API_ENDPOINT from './globals/api-endpoint';

// eslint-disable-next-line no-restricted-globals, no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

const jsAndManifest = new Route(({ url }) => {
  /* eslint-disable no-restricted-globals */
  const allowedExtensions = ['js', 'json', 'webmanifest'];
  const isOrigin = url.origin === location.origin;
  const file = url.pathname.split('.');
  const extension = file[file.length - 1];

  return isOrigin && allowedExtensions.includes(extension);
  /* eslint-enable */
}, new NetworkFirst({ cacheName: 'js-manifest' }));

const imageAssetRoute = new Route(
  ({ url }) => {
    /* eslint-disable no-restricted-globals */
    const isImageFromOrigin = url.origin === location.origin;
    return isImageFromOrigin && url.pathname.startsWith('/images/');
    /* eslint-enable */
  },
  new CacheFirst({
    cacheName: 'local-image',
  }),
);
const styleAssetRoute = new Route(
  ({ url }) => {
    const isImage = url.pathname.startsWith('/styles/');
    return isImage;
  },
  new CacheFirst({
    cacheName: 'local-styles',
  }),
);

const apiRoute = new Route(
  ({ url, request }) => {
    const endpoints = Object.values(API_ENDPOINT).map(
      (endpoint) => new URL(endpoint).origin,
    );
    const isRegisteredApi = endpoints.includes(url.origin);
    return isRegisteredApi && request.destination !== 'image';
  },
  new StaleWhileRevalidate({
    cacheName: 'api-data',
  }),
);

const corsImage = new Route(
  ({ url, request }) => {
    const imageBases = Object.values(CONFIG.BASE_IMG_PATH).map(
      (base) => new URL(base).origin,
    );
    const isRegisteredBaseIMG = imageBases.includes(url.origin);
    return isRegisteredBaseIMG && request.destination === 'image';
  },
  new StaleWhileRevalidate({
    cacheName: 'remote-image',
  }),
);

const corsStyles = new Route(
  ({ url }) => {
    const styleProviders = ['https://fonts.googleapis.com'].map(
      (provider) => new URL(provider).origin,
    );
    const isCorsStyles = styleProviders.includes(url.origin);
    return isCorsStyles;
  },
  new StaleWhileRevalidate({
    cacheName: 'remote-styles',
  }),
);

registerRoute(jsAndManifest);
registerRoute(imageAssetRoute);
registerRoute(apiRoute);
registerRoute(styleAssetRoute);
registerRoute(corsImage);
registerRoute(corsStyles);

/* eslint-disable no-restricted-globals */
self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});
/* eslint-enable */
