/*
  SALSABILAH AMIN EMPIRES - Service Worker
  Logic: Offline First & Faster Loading
*/

const CACHE_NAME = 'salsabilah-v2-cache';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './software.html',
  './admin.html',
  './price-guardian.js',
  './manifest.json',
  './pavicon.png.jpg',
  './salsabilah.jpg'
];

// ১. ইনস্টল ইভেন্ট: কোর ফাইলগুলো মেমোরিতে সেভ করা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Empire Assets Cached Successfully');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ২. অ্যাক্টিভেট ইভেন্ট: পুরোনো ক্যাশ ডিলিট করা
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// ৩. ফেচ ইভেন্ট: ইন্টারনেট না থাকলেও ক্যাশ থেকে অ্যাপ চলবে
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
