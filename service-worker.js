const staticCache = "x-changesaurus-v.1.0";

const staticFiles = ["./", "./index.js", "./index.css", "./favicon.ico", "./euro.jpg"];

self.addEventListener("install", async () => {
    const cache = await caches.open(staticCache);
    cache.addAll(staticFiles);
});

self.addEventListener("activate", event => {
    return self.clients.claim();
});

self.addEventListener("fetch", event => {
    const request = event.request;
    const url = new URL(request.url);

    if (url.origin == location.origin) {
        event.respondWith(cacheFirst(request));
    }
});

async function cacheFirst(request) {
    const response = await caches.match(request);
    return response || fetch(request);
}