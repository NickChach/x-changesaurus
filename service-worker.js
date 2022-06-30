const staticCache = "x-changesaurus-v.1.4";
const dynamicCache = "dynamic-v.1.2";

const staticFiles = ["./", "./index.html", "./apikey.js", "./index.js", "./index.css", "./favicon.ico", "./euro.jpg", "https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Merriweather+Sans:wght@300;400;700&display=swap"];

self.addEventListener("install", async () => {
    const cache = await caches.open(staticCache);
    cache.addAll(staticFiles);
});

self.addEventListener("activate", event => {
    event.waitUntil(caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
            if (key !== staticCache && key !== dynamicCache) {
                return caches.delete(key);
            }
        }));
    }));
    return self.clients.claim();
});

self.addEventListener("fetch", event => {
    const request = event.request;
    const url = new URL(request.url);

    if (url.origin == location.origin) {
        event.respondWith(cacheFirst(request));
    }
    else {
        event.respondWith(networkFirst(request));
    }
});

async function cacheFirst(request) {
    const response = await caches.match(request);
    return response || fetch(request);
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCache);
    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    }
    catch (error) {
        const response = await cache.match(request);
        return response;
    }
}