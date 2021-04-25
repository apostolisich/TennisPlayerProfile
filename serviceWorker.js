const cacheKey = "nadal-profile-page";
const assets = [
    "index.html",
    "styles.css",
    "scripts.js",
    "assets/general/filter.png",
    "assets/profile/athlete_photo.webp",
    "assets/profile/facebook.png",
    "assets/profile/instagram.png",
    "assets/profile/twitter.png",
    "assets/logo/icon.png",
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

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cacheKey).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});