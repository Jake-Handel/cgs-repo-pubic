import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import Opportunities from '../Opportunities.vue'
import CodeGolfChallenges from '../CodeGolfChallenges.vue'

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
    },
    {
      path: '/code-golf',
      name: 'CodeGolf',
      component: CodeGolfChallenges
    }
  ]
})

export default router