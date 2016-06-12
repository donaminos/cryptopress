module.exports = {
  build: {
    "index.html": "index.html",
    "register.html": "register.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  deploy: [
    "Crypto"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
