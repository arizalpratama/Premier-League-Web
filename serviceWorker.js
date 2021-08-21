importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '3' },
        { url: '/index.html', revision: '3' },
        { url: '/manifest.json', revision: '3' },
        { url: './serviceWorker.js', revision: '3' },
        { url: './page/fav-team.html', revision: '3'},
        { url: './page/ranking.html', revision: '3'},
        { url: './page/match.html', revision: '3'},
        { url: './page/team.html', revision: '3'},
        { url: './assets/shell/nav-shell.html', revision: '3'},
        { url: './assets/css/materialize.css', revision: '3'},
        { url: './assets/css/style.css', revision: '3'},
        { url: './assets/images/background-nav.jpg', revision: '3'},
        { url: './assets/images/user/user.jpg', revision: '3'},
        { url: './assets/images/home/home1.jpg', revision: '3'},
        { url: './assets/images/home/home2.jpg', revision: '3'},
        { url: './assets/images/app/arrow-left-solid.svg', revision: '3'},
        { url: './assets/images/icons/icon-128x128.png', revision: '3'},
        { url: './assets/images/icons/icon-144x144.png', revision: '3'},
        { url: './assets/images/icons/icon-152x152.png', revision: '3'},
        { url: './assets/images/icons/icon-192x192.png', revision: '3'},
        { url: './assets/images/icons/icon-384x384.png', revision: '3'},
        { url: './assets/images/icons/icon-512x512.png', revision: '3'},
        { url: './assets/images/icons/icon-72x72.png', revision: '3'},
        { url: './assets/images/icons/icon-96x96.png', revision: '3'},
        { url: './assets/js/api.js', revision: '3'},
        { url: './assets/js/db.js', revision:  '3'},
        { url: './assets/js/functions.js', revision: '3'},
        { url: './assets/js/idb.js', revision: '3'},
        { url: './assets/js/init.js', revision: '3'},
        { url: './assets/js/materialize.js', revision: '3'},
        { url: './assets/js/script.js', revision: '3'},
        ]);
        
    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate()
        )

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
    );

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

}else{
  console.log(`Workbox gagal dimuat`);
}

// Push notification
self.addEventListener('push', event => {
    console.log(event);
    let body;
    if (event.data) {
        body = event.data.text()
    }else{
        body = "push message no payload"
    }

    let opt ={
        body,
        icon : './assets/images/icons/icon-512x512.png',
        vibrate : [100,50,100],
        data : {
            dateOfArrival : Date.now(),
            primaryKey : 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push notification',opt)
    )
})


