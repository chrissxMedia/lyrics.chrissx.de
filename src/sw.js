import { manifest, version } from "@parcel/service-worker";

addEventListener("install", (e) =>
  e.waitUntil(caches.open(version).then((cache) => cache.addAll(manifest)))
);

addEventListener("activate", (e) =>
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((key) => key !== version && caches.delete(key)))
      )
  )
);

addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(version).then((cache) => {
      let path = new URL(event.request.url).pathname;
      if (path == "/") path = "/index.html";
      return cache.match(path);
    })
  );
});
