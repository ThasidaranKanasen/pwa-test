importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyDrZZ3G5DTmlFVT8i5FJwbJm7YOWz70YYA",
    authDomain: "pegasus-1b9eb.firebaseapp.com",
    databaseURL: "https://pegasus-1b9eb.firebaseio.com",
    projectId: "pegasus-1b9eb",
    storageBucket: "pegasus-1b9eb.appspot.com",
    messagingSenderId: "339448737385",
    appId: "1:339448737385:web:5f17859770f08726"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v7';
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  './index.html',
  './img/horse.svg',
  './css/main.css',
  './js/app.js',
  './manifest.json'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin) || event.request.method !== 'GET') {
    // External request, or POST, ignore
    return void event.respondWith(fetch(event.request));
  }

  event.respondWith(
    // Always try to download from server first
    fetch(event.request).then(response => {
      // When a download is successful cache the result
      caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, response)
      });
      // And of course display it
      return response.clone();
    }).catch((_err) => {
      // A failure probably means network access issues
      // See if we have a cached version
      return caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          // We did have a cached version, display it
          return cachedResponse;
        }


      });
    })
  );
});