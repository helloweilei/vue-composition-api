<template>
  <div ref="divElem"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'
import createLine from '../utils/createLine'

const divElem = ref<HTMLDivElement | undefined>()

const { scene, camera, renderer } = initCanvas()
const line = createLine(0xff0000)

scene.add(line);
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

renderer.render(scene, camera)

onMounted(() => {
  divElem.value!.appendChild(renderer.domElement)
})

</script>