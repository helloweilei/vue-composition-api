<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'

const canvas = ref<HTMLCanvasElement | undefined>()
const objects: Array<THREE.Object3D> = []

onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)

  objects.forEach(geo => scene.add(geo))
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