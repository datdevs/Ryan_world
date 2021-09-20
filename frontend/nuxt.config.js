// const strapiBaseUri = process.env.API_URL || 'http://localhost:1337'
// const environment = (process.env.NODE_ENV || 'development').trim()
const strapiBaseUri = process.env.API_URL
const environment = process.env.NODE_ENV

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  // target: 'static',
  target: 'server',

  env: {
    strapiBaseUri
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'aos/src/sass/aos.scss',
    '@assets/scss/app.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/cs.js', ssr: false },
    { src: '~/plugins/jsonld.js' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/tailwindcss'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/pwa', '@nuxtjs/markdownit', '@nuxtjs/strapi'],
  strapi: {
    url: strapiBaseUri,
    entities: [
      {
        name: 'articles',
        type: 'collection'
      },
      {
        name: 'categories',
        type: 'collection'
      },
      {
        name: 'homepage',
        type: 'single'
      },
      {
        name: 'global',
        type: 'single'
      }
    ]
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    html: true
  },

  // Router Configuration
  router: {
    extendRoutes(routes, resolve) {
      routes.forEach(route => {
        if (route.name == 'articles-slug') {
          route.alias = '/:slug'
        }
      })
      // routes.push({
      //   name: 'custom',
      //   path: '*',
      //   component: resolve(__dirname, 'pages/404.vue')
      // })
    },
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'xactive-link'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      cssModules: {
        modules: {
          localIdentName: environment === 'development' ? '[name]__[local]' : '[hash:base64:5]'
        }
      }
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
          stage: 4,
          browsers: environment === 'development' ? '>100%' : ['> 0.25%', 'not dead'] // Cross browser support, lightweight in dev env
        },
        cssnano: {
          preset: [
            'advanced',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      }
    }
  }
}
