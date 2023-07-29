<template>
  <canvas ref="canvas"></canvas>
  <div class="settings">
    material:
    <select v-model="materialRef">
      <option v-for="name in materialList" key="name">{{ name }}</option>
    </select><br />
    <input type="checkbox" v-model="options.flatShading" />flatShading<br />
    <input type="color" :value="toHexColorString(options.emissive)" @change="onEmissiveChange" />Emissive <br />
    <input type="color" :value="toHexColorString(options.color)" @change="onColorChange" />Color <br />
    <input type="number" min="0" max="1" @input="onNumberOptionChange('roughness', $event)" />Roughness<br />
    <input type="number" min="0" max="1" @input="onNumberOptionChange('metalness', $event)" />Metalness
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, reactive, ref, watch } from 'vue'
import initCanvas from '../utils/initCanvas'

const materialList = [
  'basic', 'lamBert', 'phong', 'standard'
]

const options = reactive({
  color: parseInt('0xff6622'),
  flatShading: false,
  side: THREE.FrontSide,
  emissive: parseInt('0xff6622'),
  roughness: 0.5,
  metalness: 0.5
});

const toHexColorString = (val: number) => {
  return '#' + val.toString(16)
}

const canvas = ref<HTMLCanvasElement | undefined>()
const materialRef = ref<string>('basic')
const geometry = new THREE.SphereGeometry(10, 10, 10)

const onEmissiveChange = (e: Event) => {
  const color = (e.target as HTMLInputElement).value
  options.emissive = formatColor(color)
}

const onColorChange = (e: Event) => {
  const color = (e.target as HTMLInputElement).value
  options.color = formatColor(color)
}

const onNumberOptionChange = (field: 'roughness' | 'metalness', e: Event) => {
  const value = parseFloat((e.target as HTMLInputElement).value)
  options[field] = value < 0 ? 0 : (value > 1 ? 1 : value)
}

function formatColor(colorStr: string) {
  return parseInt(colorStr.replace('#', '0x'))
}

function createSphere(): THREE.Mesh {
  let material: THREE.Material

  switch (materialRef.value) {
    case 'basic':
      material = new THREE.MeshBasicMaterial({ color: options.color, side: options.side })
      break;
    case 'lamBert':
      material = new THREE.MeshLambertMaterial({
        color: options.color,
        emissive: options.emissive,
        flatShading: options.flatShading
      })
    case 'phong':
      material = new THREE.MeshPhongMaterial({
        color: options.color,
        emissive: options.emissive,
        flatShading: options.flatShading
      })
    case 'standard':
      material = new THREE.MeshStandardMaterial({
        color: options.color,
        emissive: options.emissive,
        flatShading: options.flatShading,
        roughness: options.roughness,
        metalness: options.metalness
      })
  }


  return new THREE.Mesh(geometry, material!)
}

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(-2, 2, -1)

function renderSphere(
  scene: THREE.Scene,
  renderer: THREE.Renderer,
  camera: THREE.Camera,
) {
  const sphere = createSphere()
  scene.clear()
  scene.add(sphere, light)
  renderer.render(scene, camera)
}



onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)
  camera.position.z = 50
  renderSphere(scene, renderer, camera)

  watch([materialRef, options], () => {
    renderSphere(scene, renderer, camera)
  })
})

</script>

<style scoped>
.settings {
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px;
}
</style>