import { createRouter, createWebHistory } from 'vue-router'

import SceneDemo from '../views/SceneDemo.vue'
import MaterialList from '../views/MaterialList.vue'
import TextureDemoVue from '../views/TextureDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/scene',
    component: SceneDemo
  }, {
    path: '/materials',
    component: MaterialList
  }, {
    path: '/texture',
    component: TextureDemoVue
  }]
})

export default router