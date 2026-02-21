const CACHE_NAME = "sistema-fainas-v2";

const urlsToCache = [
  "/Sistema-fainas/",
  "/Sistema-fainas/index.html",
  "/Sistema-fainas/style.css",
  "/Sistema-fainas/script.js",
  "/Sistema-fainas/manifest.json",
  "/Sistema-fainas/icon-192.png",
  "/Sistema-fainas/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});