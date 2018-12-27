var staticCacheName = 'neighbourhood-map-v1';
var cacheFiles = [
  './',
  './components/locationList.js',
  './components/MapContainer.js',
  './utils/FoursquareAPI.js',
  './data/Locations.json',
  './img/icon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('neighbourhood-map-v1').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});