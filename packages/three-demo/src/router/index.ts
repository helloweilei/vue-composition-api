import { createRouter, createWebHistory } from 'vue-router'

import SceneDemo from '../views/SceneDemo.vue'
import MaterialList from '../views/MaterialList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/scene',
    component: SceneDemo
  }, {
    path: '/materials',
    component: MaterialList
  }]
})

export default router