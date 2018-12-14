import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/hit',
      name: 'hit',
      component: () => import(/* webpackChunkName: "about" */ './views/Hit.vue')
    },
    {
      path : '/game/:id',
      name : 'game-board',
      component :() => import( /* webpackChunkName: "about" */ './views/game.vue')
    },
    {
      path: '/loby',
      name: 'loby',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/loby.vue')
    },
    {
      path: '/room/:id',
      name: 'room',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/room.vue')
    }
  ]
})
