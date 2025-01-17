
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
	loading: { color: 'cyan'},
  /*
  ** Global CSS
  */
  css: [
		{ src: 'node_modules/vue-material/dist/vue-material.min.css' , lang: 'css'},
		{ src: '~/assets/theme.scss' , lang: 'scss'}
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
		{ src: 'plugins/vue-mterial'},
		{ src: 'plugins/axios'},
		{ src: 'plugins/firestore'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
		credentials: true,
		proxy: true,
	},
	proxy: {
		"/api/": {
			target: 'https://newsapi.org/v2/',
			pathRewrite: { '^/api/': ''}
		},
		"/register/": {
			target: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwvami0C3twhqrhaBQP0D9PhR85Xf5FTA',
			pathRewrite: { '^/register/': ''},
		},
		"/login/": {
			target:
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwvami0C3twhqrhaBQP0D9PhR85Xf5FTA",
			pathRewrite: { "^/login/": "" }
		}
	},
	env: {
		NEWS_API_KEY: '1b41119f196245849846048f40bdda54'
	},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
