<template>
  <canvas ref="canvas"></canvas>
  <div class="split">
    <div id="view1" tabindex="1"></div>
    <div id="view2" tabindex="2"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'
// 围绕某一个点旋转控制相机
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

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
const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize)
const boxMat = new THREE.MeshPhongMaterial({ color: '#8AC' })
const box = new THREE.Mesh(boxGeo, boxMat)
box.position.set(boxSize + 1, boxSize / 2, 0)
objects.push(box)

// create sphere
const radius = 3
const sphereGeo = new THREE.SphereGeometry(radius, 32, 32)
const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' })
const sphere = new THREE.Mesh(sphereGeo, sphereMat)
sphere.position.set(-radius - 1, radius + 1, 0)
objects.push(sphere)

// directional light
const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.position.set(0, 10, 0)
light.target.position.set(-5, 0, 0)
objects.push(light)
objects.push(light.target)

const lightHelper = new THREE.DirectionalLightHelper(light)
objects.push(lightHelper)

onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)
  const cameraHelper = new THREE.CameraHelper(camera)
  camera.far = 100

  objects.forEach(obj => scene.add(obj))
  scene.add(cameraHelper)
  camera.position.set(0, 10, 20)
  renderer.render(scene, camera)

  const view1Elem = document.querySelector('#view1') as HTMLDivElement
  const view2Elem = document.querySelector('#view2') as HTMLDivElement
  const controls = new OrbitControls(camera, view1Elem as HTMLElement)
  controls.target.set(0, 5, 0)
  controls.update()

  const camera2 = new THREE.PerspectiveCamera(
    45,  // fov
    2,   // aspect
    0.1, // near
    500, // far
  );
  camera2.position.set(40, 10, 80);
  camera2.lookAt(0, 5, 0);

  const controls2 = new OrbitControls(camera2, view2Elem as HTMLElement);
  controls2.target.set(0, 5, 0);
  controls2.update();

  function setScissorForElement(elem: HTMLElement) {
    const elemRect = elem.getBoundingClientRect();

    // 设置剪函数以仅渲染一部分场景
    renderer.setScissor(elemRect.left, 0, elemRect.width, elemRect.height);
    renderer.setViewport(elemRect.left, 0, elemRect.width, elemRect.height);

    // 返回aspect
    return elemRect.width / elemRect.height;
  }

  renderer.setScissorTest(true);

  function render() {
    const aspect = setScissorForElement(view1Elem!)
    camera.aspect = aspect
    camera.updateProjectionMatrix()
    cameraHelper.update()
    scene.background = new THREE.Color(0x000000)
    cameraHelper.visible = false
    renderer.render(scene, camera)

    const aspect2 = setScissorForElement(view2Elem)
    camera2.aspect = aspect2
    camera2.updateProjectionMatrix()
    cameraHelper.update()
    scene.background = new THREE.Color(0x000040)
    cameraHelper.visible = true
    renderer.render(scene, camera2)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render);

})

</script>
<style>
.split {
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
}

.split>div {
  width: 100%;
  height: 100%;
}
</style>