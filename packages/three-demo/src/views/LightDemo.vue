<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'
// 围绕某一个点旋转控制相机
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvas = ref<HTMLCanvasElement | undefined>()
const objects: Array<THREE.Object3D> = []

const planeSize = 40
// load texture
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('../../public/images/grid.png')
texture.magFilter = THREE.NearestFilter
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.colorSpace = THREE.SRGBColorSpace
const repeatCount = planeSize / 2
texture.repeat.set(repeatCount, repeatCount)

// create plain
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeo, planeMat)
plane.rotation.x = Math.PI * -.5
objects.push(plane)

// create Box
const boxSize = 4
const boxGeo = new THREE.BoxGeometry(boxSize, boxSize)
const boxMat = new THREE.MeshPhongMaterial({ color: '#8AC' })
const box = new THREE.Mesh(boxGeo, boxMat)
box.position.set(boxSize + 1, boxSize / 2, 0)
objects.push(box)

onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)
  const controls = new OrbitControls(camera, canvas.value!)
  controls.target.set(0, 5, 0)
  controls.update()

  objects.forEach(obj => scene.add(obj))
  camera.position.z = 5

  renderer.render(scene, camera)
})

</script>