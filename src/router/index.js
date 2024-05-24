import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Camera from '../views/Camera.vue'
import HomeView from '@/views/HomeView.vue'
import Stockage from '@/views/StockageView.vue'
import Position from '@/views/PositionView.vue'
import Appel from '@/views/AppelView.vue'
import Batterie from '@/views/BatterieView.vue'
import Vibreur from '@/views/VibreurView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/camera',
    name: 'camera',
    component: Camera
  },
  {
    path: '/stockage',
    name: 'stockage',
    component: Stockage
  },
  {
    path: '/position',
    name: 'position',
    component: Position
  },
  {
    path: '/appel',
    name: 'appel',
    component: Appel
  },
  {
    path: '/batterie',
    name: 'batterie',
    component: Batterie
  },
  {
    path: '/vibreur',
    name: 'vibreur',
    component: Vibreur
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
