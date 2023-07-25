<template>
  <div ref="divElem"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'
import createCube from '../utils/createCube'
import { createDirectionalLight } from '../utils/light';

const divElem = ref<HTMLDivElement | undefined>()

const { scene, camera, renderer } = initCanvas()
const cube = createCube()
const cube2 = createCube()
cube2.position.x = 2

const light = createDirectionalLight([-1, 2, 4]);

scene.add(cube);
scene.add(cube2);
scene.add(light);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube2.rotation.z += 0.01
  renderer.render(scene, camera)
}
animate();

onMounted(() => {
  divElem.value!.appendChild(renderer.domElement)
})

</script>