/* global importScripts:false, WorkboxSW:false */
importScripts('workbox-sw.prod.js');

const workboxSW = new WorkboxSW({ clientsClaim: true, skipWaiting: true });
workboxSW.precache([]);

const localCacheStrategy = workboxSW.strategies.staleWhileRevalidate({
  cacheableResponse: {
    statuses: [0, 200],
  },
});

const cdnCacheStrategy = workboxSW.strategies.staleWhileRevalidate({
  cacheableResponse: {
    statuses: [0, 200],
  },
});

workboxSW.router.registerRoute(/\.(css|js|html)$/,
  localCacheStrategy);

workboxSW.router.registerRoute(/^(https:\/\/fonts\.googleapis.com\/).+/,
  cdnCacheStrategy);

workboxSW.router.registerRoute(/^(https:\/\/fonts\.gstatic.com\/).+/,
  cdnCacheStrategy);
