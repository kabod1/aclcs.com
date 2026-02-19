const CACHE_NAME = "aclcs-v1";

const PRECACHE_URLS = ["/", "/login", "/register", "/about", "/services", "/contact"];

// Install: pre-cache key pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
      )
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests on same origin
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Never intercept: API routes, portal, admin (must be fresh/authenticated)
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/portal") ||
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/pending-approval") ||
    url.pathname.startsWith("/suspended")
  ) {
    return;
  }

  // Cache-first for Next.js static assets (immutable)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return res;
          })
      )
    );
    return;
  }

  // Network-first for HTML pages (stale fallback)
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return res;
      })
      .catch(() => caches.match(request))
  );
});
