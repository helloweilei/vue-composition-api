<template>
  <canvas ref="canvas"></canvas>
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

class ColorGUIHelper {
  object: object;
  prop: string;

  constructor(object: object, prop: string) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 5, 0.01);
gui.add(light.target.position, 'x', - 10, 10, .01);
gui.add(light.target.position, 'z', - 10, 10, .01);
gui.add(light.target.position, 'y', 0, 10, .01);

onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)

  objects.forEach(obj => scene.add(obj))
  camera.position.set(0, 10, 40)

  renderer.render(scene, camera)
  const controls = new OrbitControls(camera, canvas.value!)
  controls.target.set(0, 5, 0)
  controls.update()

  function resizeRendererToDisplaySize(renderer) {

    const canvas = renderer.domElement;
    canvas.style.width = '100%'
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {

      renderer.setSize(width, height, false);

    }

    return needResize;

  }

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {

      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();

    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);

  }

  requestAnimationFrame(render);

})

</script>