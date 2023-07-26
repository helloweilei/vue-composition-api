<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'
import { createDirectionalLight } from '../utils/light'
import { createMaterial } from '../utils/material'

const canvas = ref<HTMLCanvasElement | undefined>()
const objects: Array<THREE.Object3D> = []

const circleGeometry = new THREE.CircleGeometry(0.4, 100)
const circle = new THREE.Mesh(circleGeometry, createMaterial())

const coneGeometry = new THREE.ConeGeometry(
  0.4, 1,
  40, 40,
  false,
  0, Math.PI * 2);
const cone = new THREE.Mesh(coneGeometry, createMaterial())

const cylinderGeometry = new THREE.CylinderGeometry(
  0.4, 0.4, 1, 20);
const cylinder = new THREE.Mesh(cylinderGeometry, createMaterial())
cylinder.position.x = -1

const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.4, 4)
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, createMaterial())
dodecahedron.position.x = 1

const sphereGeometry = new THREE.SphereGeometry(0.6, 10, 10)
const sphere = new THREE.Mesh(sphereGeometry, createMaterial())
sphere.position.y = 1.3

const wireFrameGeometry = new THREE.WireframeGeometry(
  new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
)
const wireFrame = new THREE.Mesh(wireFrameGeometry, createMaterial())
wireFrame.position.y = -1.3

const material = new THREE.PointsMaterial({
  color: 'red',
  size: 0.1,     // in world units
})
const points = new THREE.Points(sphereGeometry, material)
points.position.x = 2

const light = createDirectionalLight([-1, 2, 4])
objects.push(circle, cone, cylinder, dodecahedron, sphere, wireFrame,
  points
)

onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)

  objects.forEach(geo => scene.add(geo))
  scene.add(light)
  camera.position.z = 5

  function animate() {
    requestAnimationFrame(animate)
    objects.forEach(geometry => {
      geometry.rotation.x += 0.01
      geometry.rotation.y += 0.01
    })

    renderer.render(scene, camera)
  }
  animate()
})

</script>