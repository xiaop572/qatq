import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/collectcard',
    name: 'collectCard',
    component: () => import('../views/collectCard.vue')
  }, {
    path: '/drawlucky',
    name: 'drawLucky',
    component: () => import('../views/drawLucky.vue')
  },
  {
    path: '/attention',
    name: 'attention',
    component: () => import('../views/attention.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router