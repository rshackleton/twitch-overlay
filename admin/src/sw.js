/*
  global
  clients: false
  firebase:false
  importScripts:false
  WorkboxSW:false
*/
importScripts('firebase-app.js');
importScripts('firebase-messaging.js');
importScripts('workbox-sw.js');

// Configure firebase.
const config = {
  messagingSenderId: '871762046895',
};

firebase.initializeApp(config);

// Add background message handling.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const donation = payload.data;

  return self.registration.getNotifications()
    .then((notifications) => {
      if (notifications && notifications.length) {
        return notifications[0];
      }
      return null;
    })
    .then((currentNotification) => {
      let notificationTitle;
      let notificationOptions;

      if (currentNotification) {
        // Increment existing donation notification.
        const count = (currentNotification.data.count + 1);

        notificationTitle = `${count} new donations have been received!`;
        notificationOptions = {
          data: { count },
        };

        currentNotification.close();
      } else {
        // New donation notification.
        notificationTitle = 'A new donation has been received!';
        notificationOptions = {
          body: `A new donation of £${donation.amount} has been receieved from ${donation.donorDisplayName}.`,
          data: { count: 1 },
        };
      }

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      );
    });
});

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

// Handle notification click events.
self.addEventListener('notificationclick', (event) => {
  // Close notification.
  event.notification.close();

  // Focus existing client or open new.
  const urlToOpen = new URL('/donations', self.location.origin).href;

  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i += 1) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      }

      return clients.openWindow(urlToOpen);
    });

  event.waitUntil(promiseChain);
});
