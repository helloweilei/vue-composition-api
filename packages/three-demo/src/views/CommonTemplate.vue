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

  objects.forEach(obj => scene.add(obj))
  camera.position.z = 5
})

</script>