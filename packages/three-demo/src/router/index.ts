import { createRouter, createWebHistory } from 'vue-router'

import SceneDemo from '../views/SceneDemo.vue'
import MaterialList from '../views/MaterialList.vue'
import TextureDemoVue from '../views/TextureDemo.vue'
import LightDemo from '../views/LightDemo.vue'
import CameraDemoVue from '../views/CameraDemo.vue'

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
  }, {
    path: '/light',
    component: LightDemo
  }, {
    path: '/camera',
    component: CameraDemoVue
  }]
})

export default router