<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'

const canvas = ref<HTMLCanvasElement | undefined>()
const objects: Array<THREE.Object3D> = []

const light = new THREE.PointLight(0xffffff, 3)
const light2 = new THREE.DirectionalLight(0xffffff, 0.6)
light2.position.set(10, 10, 3)

const sphereGeometry = new THREE.SphereGeometry(1, 50, 50)
const solarSystem = new THREE.Object3D()
const earthObit = new THREE.Object3D()

const material = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
const sunMesh = new THREE.Mesh(sphereGeometry, material)
sunMesh.scale.set(5, 5, 5)

const earthMaterial = new THREE.MeshPhongMaterial({
  color: 0x2244ff,
  emissive: 0x112244, // 地球背靠点光源的部分也可以显示
})
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)

const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
moonMesh.scale.set(0.5, 0.5, 0.5)
moonMesh.position.x = 3

earthObit.position.x = 15

earthObit.add(earthMesh)
earthObit.add(moonMesh)

solarSystem.add(sunMesh)
solarSystem.add(earthObit)
objects.push(solarSystem, earthObit)

onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)
  scene.background = new THREE.Color(0x000000)

  scene.add(solarSystem)
  scene.add(light, light2)
  camera.position.set(0, 50, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  function animate(time: number) {
    requestAnimationFrame(animate)
    objects.forEach((obj, i) => {
      obj.rotation.y = time * 0.001 * (i + 1)
    })

    renderer.render(scene, camera)
  }
  animate(0)
})

</script>