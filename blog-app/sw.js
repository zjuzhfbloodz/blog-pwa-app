// Service Worker for Blog PWA
const CACHE_NAME = 'blog-pwa-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Files to cache
const STATIC_FILES = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// Install Event
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            console.log('[SW] Caching static files');
            return cache.addAll(STATIC_FILES);
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
                    .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // For blog articles - Network first
    if (url.pathname.startsWith('/article') || url.pathname.startsWith('/post')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Clone and cache
                    const clonedResponse = response.clone();
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(event.request, clonedResponse);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
        return;
    }
    
    // For static files - Cache first
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            
            return fetch(event.request).then((response) => {
                // Cache successful responses
                if (response.status === 200) {
                    const clonedResponse = response.clone();
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(event.request, clonedResponse);
                    });
                }
                return response;
            });
        })
    );
});

// Background Sync (for offline support)
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag);
});

// Push Notifications (if needed)
self.addEventListener('push', (event) => {
    console.log('[SW] Push received');
    const data = event.data?.json() || {};
    const title = data.title || '博客更新';
    const options = {
        body: data.body || '有新文章发布',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-72.png'
    };
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Message from main thread
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});

console.log('[SW] Blog Service Worker loaded!');
