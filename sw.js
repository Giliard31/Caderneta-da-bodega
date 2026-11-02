const cacheName = "caderneta-bodega-v4";
const arquivos = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icone-192.png",
  "./icone-512.png"
];

// Instalação e armazenamento dos arquivos em cache
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(arquivos);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== cacheName; }).map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Interpelação de requisições para funcionamento offline
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});
