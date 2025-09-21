const CACHE_NAME = "startpage-cache-v1";
const ASSETS = [
"index.html",
"manifest.json",
"icon-192.png",
"icon-512.png"
];

// Install: cache app shell
self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
});

// Activate: cleanup old caches
self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
});

// Fetch: serve cached files when offline
self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(resp => resp || fetch(event.request))
);
});
