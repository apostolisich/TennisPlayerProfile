const cacheKey = "tennis-player-profile";
const assets = [
    "index.html",
    "no-connection.html",
    "css/index-page.css",
	  "css/profile-page.css",
  	"css/yearpicker.css",
    "js/index-page.js",
	  "js/profile-page.js",
	  "js/yearpicker.js",
    "manifest.json",
    "assets/profile/athlete_photo.webp",
    "assets/profile/facebook.png",
    "assets/profile/instagram.png",
    "assets/profile/twitter.png",
    "assets/logo/logo_144.png",
  	"assets/logo/logo_192.png",
	  "assets/logo/logo_512.png",
    "assets/tournaments/acapulco.jpg",
    "assets/tournaments/atp_cup.webp",
    "assets/tournaments/atp_finals.webp",
    "assets/tournaments/australian_open.webp",
    "assets/tournaments/barcelona_open.png",
    "assets/tournaments/buenos_aires.webp",
    "assets/tournaments/china_open.png",
    "assets/tournaments/doha.webp",
    "assets/tournaments/hamburg.webp",
    "assets/tournaments/madrid.webp",
    "assets/tournaments/monte_carlo.webp",
    "assets/tournaments/paris_open.webp",
    "assets/tournaments/rio_dejaneiro.webp",
    "assets/tournaments/roland_garros.png",
    "assets/tournaments/rome.webp",
    "assets/tournaments/stuttgart.png",
    "assets/tournaments/us_open.png"
];

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(cacheKey).then(cache => {
           return cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        let responseClone = response.clone();
        caches.open(cacheKey).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      }).catch(() => {
        /*Εδώ θα φτάσει ο κώδικας την πρώτη φορά που ο χρήστης θα φτιάξει προφίλ χωρίς να έχει επισκεφθεί πιο πριν τη σελίδα profile.html.
          Γυρνάω αυτή τη σελίδα για να καλύψω όλες τις περιπτώσεις τις offline λειτουργίας, ώστε ο χρήστης να παίρνει πάντα απαντήσεις
          από το site.*/
        return caches.match('no-connection.html');
      })
    })
  );
});