const cacheKey = "tennis-player-profile";
const assets = [
    "/index.html",
	"/profile.html",
    "/css/index-page.css",
	"/css/profile-page.css",
	"/css/yearpicker.css",
    "/js/index-page.js",
	"/js/profile-page.js",
	"/js/yearpicker.js",
    "/manifest.json",
    "/assets/profile/athlete_photo.webp",
    "/assets/profile/facebook.png",
    "/assets/profile/instagram.png",
    "/assets/profile/twitter.png",
    "/assets/logo/logo_144.png",
	"/assets/logo/logo_192.png",
	"/assets/logo/logo_512.png",
    "/assets/tournaments/acapulco.jpg",
    "/assets/tournaments/atp_cup.webp",
    "/assets/tournaments/atp_finals.webp",
    "/assets/tournaments/australian_open.webp",
    "/assets/tournaments/barcelona_open.png",
    "/assets/tournaments/buenos_aires.webp",
    "/assets/tournaments/china_open.png",
    "/assets/tournaments/doha.webp",
    "/assets/tournaments/hamburg.webp",
    "/assets/tournaments/madrid.webp",
    "/assets/tournaments/monte_carlo.webp",
    "/assets/tournaments/paris_open.webp",
    "/assets/tournaments/rio_dejaneiro.webp",
    "/assets/tournaments/roland_garros.png",
    "/assets/tournaments/rome.webp",
    "/assets/tournaments/stuttgart.png",
    "/assets/tournaments/us_open.png"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cacheKey).then(cache => {
           return cache.addAll(assets);
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