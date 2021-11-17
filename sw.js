const static = "static-v2";
const assets = [
  "fallback.html"
];
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(static).then(cache => cache.addAll(assets))
  );
});

self.addEventListener("activate", event => {
  const saves = [static];
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys
      .map(key => !saves.includes(key) ? caches.delete(key) : null)
    ))
  );
});
self.addEventListener("fetch", event => {
  const url = event.request.url;
  event.respondWith(
    caches.match(url).then(res => res ? res : fetch(url)
      .then(res => res)
      .catch(() => caches.match("fallback.html"))
    )
  );
});