import { timestamp, files, build } from '$service-worker'

const ASSETS = `cache${timestamp}`

const to_cache = build.concat(files)
const staticAssets = new Set(to_cache)

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(ASSETS)
			.then(cache => cache.addAll(to_cache))
			.then(() => {
				self.skipWaiting()
			})
	)
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(async keys => {
			// delete old caches
			for (const key of keys) {
				if (key !== ASSETS) await caches.delete(key)
			}

			self.clients.claim()
		})
	)
})

/**
 * Fetch the asset from the network and store it in the cache.
 * Fall back to the cache if the user is offline.
 */
async function fetchAndCache(request) {
	const cache = await caches.open(`offline${timestamp}`)

	try {
		const response = await fetch(request)
		cache.put(request, response.clone())
		return response
	} catch (err) {
		const response = await cache.match(request)
		if (response) return response

		throw err
	}
}

self.addEventListener('fetch', event => {
	if (event.request.method !== 'GET' || event.request.headers.has('range'))
		return

	const url = new URL(event.request.url)

	// don't try to handle e.g. data: URIs
	if (!url.protocol.startsWith('http')) return

	const isHttp = url.protocol.startsWith('http')
	const isDevServerRequest =
		url.hostname === self.location.hostname &&
		url.port !== self.location.port
	const isStaticAsset =
		url.host === self.location.host && staticAssets.has(url.pathname)
	const skipBecauseUncached =
		event.request.cache === 'only-if-cached' && !isStaticAsset

	if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
		event.respondWith(
			(async () => {
				// always serve static files and bundler-generated assets from cache.
				// if your application has other URLs with data that will never change,
				// set this variable to true for them and they will only be fetched once.
				const cachedAsset =
					isStaticAsset &&
					(await caches.match(event.request, {
						ignoreVary: true,
					}))

				return cachedAsset || fetchAndCache(event.request)
			})()
		)
	}
})
