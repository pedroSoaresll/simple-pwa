this.addEventListener('install', event => {

    console.log('install')

    event.waitUntil(
        caches.open('v1').then(cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/launcher-icon-1x.png',
                '/launcher-icon-2x.png',
                '/launcher-icon-4x.png',
                '/manifest.json',
                '/service-worker.js'
            ])
            
        })
    )

})


this.addEventListener('fetch', event => {

    console.log('fetch')

    event.respondWith(caches.match(event.request).then(response => {

        if (response !== undefined) {
            return response
        } else {

            return fetch(event.request).then(response => {

                let responseClone = response.clone()

                caches.open('v1').then(cache => {
                    cache.put(event.request, responseClone)
                })

                return response

            }).catch(() => {
                return caches.match('/launcher-icon-1x.png')
            })

        }

    }))

})