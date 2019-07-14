module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "**/*.{css,json,js,jpg,html,png}"
  ],
  "globIgnores": ["package.json", "package-lock.json", "Gruntfile.js", "sw-src.js", "workbox-config.js", "node_modules/**/*", "img_src/**/*"],
  "swDest": "./sw.js",
  "swSrc": "./sw-src.js"
};
