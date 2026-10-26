self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("rolodex-cache").then((cache) => {
      return cache.addAll([
        "index.html",
        "app.js",
        "manifest.json",
        "data.json"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
