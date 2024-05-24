const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'Premier projet',  // Le nom de votre PWA, qui apparaîtra sur l'écran d'accueil
    themeColor: '#4DBA87',  // Couleur principale de la barre d'adresse et de l'écran de démarrage
    msTileColor: '#000000', // Couleur de fond pour les tuiles Microsoft
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // Configurer les chemins des icônes (doivent correspondre aux chemins dans votre manifest.json)
    iconPaths: {
      favicon32: './img/icons/emoji.png',
      favicon16: './img/icons/emoji.png',
      appleTouchIcon: './img/icons/emoji.png',
      maskIcon: './img/icons/emoji.png',
      msTileImage: './img/icons/emoji.png'
    },

    // Options de Workbox pour le service worker
    workboxPluginMode: 'GenerateSW',  // Génère automatiquement un SW prêt à l'emploi
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          // Exemple de mise en cache d'API
          urlPattern: new RegExp('^https://localhost:8080'),
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 10,
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 300
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          // Mise en cache des images
          urlPattern: new RegExp('\\.(?:png|gif|jpg|jpeg|svg)$'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 jours
            }
          }
        }
      ]
    }
  }
});
