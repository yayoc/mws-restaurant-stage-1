importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([
  {
    "url": "css/styles.css",
    "revision": "45ae104a083a175417138b2e04eddfe1"
  },
  {
    "url": "data/restaurants.json",
    "revision": "500a3defff288a163f63f80b48025716"
  },
  {
    "url": "img/1-large.jpg",
    "revision": "3a82f0cf70611fff1b945597f84d1923"
  },
  {
    "url": "img/1-medium.jpg",
    "revision": "c39854fe6a60eb5874dd69d9649137c8"
  },
  {
    "url": "img/1-small.jpg",
    "revision": "b26d08bdde0476e49f472985d8656d34"
  },
  {
    "url": "img/10-large.jpg",
    "revision": "e4c07d47d384b2b8f90fe7d205c07dab"
  },
  {
    "url": "img/10-medium.jpg",
    "revision": "e8f2155f2fd1cd996767dc4e143c6a58"
  },
  {
    "url": "img/10-small.jpg",
    "revision": "8425538fde573cc26364a918369252c3"
  },
  {
    "url": "img/2-large.jpg",
    "revision": "02284fca09bfb9e6e76c1198e4544fc0"
  },
  {
    "url": "img/2-medium.jpg",
    "revision": "9c03f47306e6c2b07dba10bc8af917d9"
  },
  {
    "url": "img/2-small.jpg",
    "revision": "6c5aec6011a25e43675ee44094e4103f"
  },
  {
    "url": "img/3-large.jpg",
    "revision": "4c3af26775785221b8fffac20c801394"
  },
  {
    "url": "img/3-medium.jpg",
    "revision": "47e56e26534862183350a3bfe6c23d19"
  },
  {
    "url": "img/3-small.jpg",
    "revision": "f0bb13f0b562f1e1dbabf6832d9e0af2"
  },
  {
    "url": "img/4-large.jpg",
    "revision": "75c5d53cd4f7dce5abdd0311bade85cf"
  },
  {
    "url": "img/4-medium.jpg",
    "revision": "2ed5f36ac2e913a2970cdab9247e1cb4"
  },
  {
    "url": "img/4-small.jpg",
    "revision": "df64f5750ca84bc0904a479f7758825d"
  },
  {
    "url": "img/5-large.jpg",
    "revision": "11fdf1490f2d0ea015f4d8f449a6bbc2"
  },
  {
    "url": "img/5-medium.jpg",
    "revision": "f5b2c779637d93a3506bbfe81ec9b4d6"
  },
  {
    "url": "img/5-small.jpg",
    "revision": "5916698105d55d9900524de091afab42"
  },
  {
    "url": "img/6-large.jpg",
    "revision": "10607064ac91343d9ffe7d16ae1fde08"
  },
  {
    "url": "img/6-medium.jpg",
    "revision": "138eaf04a904a293c02400607da3b558"
  },
  {
    "url": "img/6-small.jpg",
    "revision": "cfb35569828aa5e8827336995ed12616"
  },
  {
    "url": "img/7-large.jpg",
    "revision": "712e2476c418f3e1ec6e394a5cf9477f"
  },
  {
    "url": "img/7-medium.jpg",
    "revision": "34eece323cc73a6a9afee64cc14c66c2"
  },
  {
    "url": "img/7-small.jpg",
    "revision": "f928124284936c8f9d2a586839d08b86"
  },
  {
    "url": "img/8-large.jpg",
    "revision": "807956195f38f47baea39f803600daef"
  },
  {
    "url": "img/8-medium.jpg",
    "revision": "004e0dc6bec714b51777ff3b9b59c8e6"
  },
  {
    "url": "img/8-small.jpg",
    "revision": "ed8342d1dddf33a19ba74080a7b65e04"
  },
  {
    "url": "img/9-large.jpg",
    "revision": "f6b0a32c356cb0f80c9cf68e434fb80e"
  },
  {
    "url": "img/9-medium.jpg",
    "revision": "a0fe4e9c18a0635dd8d9c14775dd9dfa"
  },
  {
    "url": "img/9-small.jpg",
    "revision": "770e7d22224da956611ecab0a1ae721a"
  },
  {
    "url": "index.html",
    "revision": "ab2f626135d6b6936e11b269657550ba"
  },
  {
    "url": "js/dbhelper.js",
    "revision": "570af0f2828ea0c21b22545854ab14dc"
  },
  {
    "url": "js/leaflet.js",
    "revision": "08cb8781a018744f012bf3c207be9033"
  },
  {
    "url": "js/main.js",
    "revision": "7b97a88f5a1316c20c06472eadf22641"
  },
  {
    "url": "js/restaurant_info.js",
    "revision": "928125993ec698300f88ac548bdb44d6"
  },
  {
    "url": "restaurant.html",
    "revision": "75312207b574c585cc1c15e66101c0c6"
  }
], {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});
