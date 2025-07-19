
const CACHE_NAME = 'gacha-tool-cache-v1';
// キャッシュするファイルのリスト
const urlsToCache = [
  './',
  './index.html',
  './gacha.html',
  './logo.png',
  './IMG_3909.jpeg'
];

// Service Worker のインストール時
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエストがあった時（ページが表示される時など）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
