<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'
import { createDirectionalLight } from '../utils/light'

const canvas = ref<HTMLCanvasElement | undefined>()
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
const material2 = new THREE.MeshPhongMaterial({ color: 0xff8822 })
const geometries: Array<any> = []

const circleGeometry = new THREE.CircleGeometry(0.4, 100)
const circle = new THREE.Mesh(circleGeometry, material)

const coneGeometry = new THREE.ConeGeometry(
  0.4, 1,
  40, 40,
  false,
  0, Math.PI * 2);
const cone = new THREE.Mesh(coneGeometry, material)

const cylinderGeometry = new THREE.CylinderGeometry(
  0.4, 0.4, 1, 20);
const cylinder = new THREE.Mesh(cylinderGeometry, material2)
cylinder.position.x = -1

const light = createDirectionalLight([-1, 2, 4])
geometries.push(circle, cone, cylinder)

onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)

  geometries.forEach(geo => scene.add(geo))
  scene.add(light)
  camera.position.z = 5

  function animate() {
    requestAnimationFrame(animate)
    geometries.forEach(geometry => {
      geometry.rotation.x += 0.01
      geometry.rotation.y += 0.01
    })

    renderer.render(scene, camera)
  }
  animate()
})

</script>