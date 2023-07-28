import { createRouter, createWebHistory } from 'vue-router'

import SceneDemo from '../views/SceneDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/scene',
    component: SceneDemo
  }]
})

export default router