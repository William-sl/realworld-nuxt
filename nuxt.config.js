export default {
   router: {
      linkExactActiveClass: 'active',
      extendRoutes(routes, resolve) {
         routes.length = 0
         routes.push(...[
            {
               path: '/',
               component: resolve(__dirname, 'pages/layout'),
               children:[
                  {
                    path: '', // 默认子路由
                    name: 'home',
                    component: resolve(__dirname, 'pages/home.vue')
                  },
                  {
                    path: '/login',
                    name: 'login',
                    component: resolve(__dirname, 'pages/user/login.vue')
                  },
                  {
                    path: '/register',
                    name: 'register',
                    component: resolve(__dirname, 'pages/user/register.vue')
                  },
                  {
                    path: '/profile/:username',
                    name: 'profile',
                    component: resolve(__dirname, 'pages/profile/')
                  },
                  {
                    path: '/settings',
                    name: 'settings',
                    component: resolve(__dirname, 'pages/settings/')
                  },
                  {
                    path: '/editor',
                    name: 'editor',
                    component: resolve(__dirname, 'pages/editor/')
                  },
                  {
                    path: '/article/:slug',
                    name: 'article',
                    component: resolve(__dirname, 'pages/article/')
                  }
               ]
            }
         ])
      }
   },
   plugins: [
      '~/plugins/request.js',
      '~/plugins/dayjs.js'
    ]
}