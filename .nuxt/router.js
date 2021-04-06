import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bba967ea = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _171886d0 = () => interopDefault(import('..\\pages\\home.vue' /* webpackChunkName: "" */))
const _db53c4d6 = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "" */))
const _11ad9727 = () => interopDefault(import('..\\pages\\user\\register.vue' /* webpackChunkName: "" */))
const _d96f5630 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _670258c4 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _d3471b64 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _7a129835 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _bba967ea,
    children: [{
      path: "",
      component: _171886d0,
      name: "home"
    }, {
      path: "/login",
      component: _db53c4d6,
      name: "login"
    }, {
      path: "/register",
      component: _11ad9727,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _d96f5630,
      name: "profile"
    }, {
      path: "/settings",
      component: _670258c4,
      name: "settings"
    }, {
      path: "/editor",
      component: _d3471b64,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _7a129835,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
