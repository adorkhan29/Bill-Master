const CACHE_NAME = 'pos-pro-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    // এক্সটারনাল লাইব্রেরি গুলো ক্যাশ করার জন্য
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://unpkg.com/html5-qrcode',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
    'https://i.ibb.co.com/ksp1tTC0/1770635905436-1.png'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        }).catch(err => console.log('Cache Failed', err))
    );
    self.skipWaiting();
});

// Fetch Event (Offline Support)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate Event (Cleaning old cache)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});