import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import Opportunities from '../Opportunities.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/opportunities',
      name: 'Opportunities',
      component: Opportunities
    }
  ]
})

export default router