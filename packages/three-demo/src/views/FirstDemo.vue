<template>
  <div ref="divElem"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'
import createCube from '../utils/createCube'

const divElem = ref<HTMLDivElement | undefined>()

const { scene, camera, renderer } = initCanvas()
const cube = createCube()

scene.add(cube);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate)
  // cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate();

onMounted(() => {
  divElem.value!.appendChild(renderer.domElement)
})

</script>