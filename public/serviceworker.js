const CACHE_NAME = "version-1";
const ulrsToCache = ['index.html', 'offline.html'];
//const self = this;

// Install the service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("Opened cache")
            return cache.addAll(ulrsToCache)
        })
    )
})

// Listen for requests
self.addEventListener('fetch', (event) => {
    console.log("FETCHING")
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
                .catch(() => {
                    caches.match('offline.html')
                })
        })
    )
})

// Activate the service worker
self.addEventListener('activate', (event) => {
    // Create an array, then push the cached filenames to it
    const chacheWhiteList = []
    chacheWhiteList.push(CACHE_NAME)
    console.log("Activating Cache")

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!chacheWhiteList.includes(cacheName)) {
                    // Delete other versions of our cache
                    return caches.delete(cacheName)
                }
            })
        ))
    )

})