<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import initCanvas from '../utils/initCanvas'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const canvas = ref<HTMLCanvasElement | undefined>()
const objects: Array<THREE.Object3D> = []

const textureLoader = new THREE.TextureLoader()


const images = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202008%2F26%2F20200826174721_QBRwe.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693663020&t=39165b8f4381a14a4cda37b39e2cea6c',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F25%2F20200425225559_hfglq.thumb.1000_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693663149&t=8074e05f84aa2695469101cca76cc469',
  'https://img1.baidu.com/it/u=436504571,1601533169&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Faf9ab8fe-3cd9-45f4-9913-33ee98fb0b0f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693663190&t=c3d035bc249613c8cbcf9caa752ff344',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201912%2F16%2F20191216105233_gfqfm.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693663222&t=c7bb67aa953c1426117d75927fa190c7',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F20%2F20210720162353_22626.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693663244&t=677edaa90eb44ec61046657f5235c0f3'
]

const textures = images.map(image => {
  const texture = textureLoader.load(image)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
})

const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }))
const geometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(geometry, materials)

// const light = new THREE.DirectionalLight(0xffffff, 0.6)
// light.position.set(10, 10, 3)

objects.push(cube)

onMounted(() => {
  const { scene, camera, renderer } = initCanvas(canvas.value!)

  objects.forEach(obj => scene.add(obj))
  camera.position.set(1, 0, 5)

  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01
    renderer.render(scene, camera)
  }
  animate()
})

class DegRadHelper {
  obj: any;
  prop: any;
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return THREE.MathUtils.radToDeg(this.obj[this.prop]);
  }
  set value(v) {
    this.obj[this.prop] = THREE.MathUtils.degToRad(v);
  }
}

class StringToNumberHelper {
  obj: any;
  prop: any;
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return this.obj[this.prop];
  }
  set value(v) {
    this.obj[this.prop] = parseFloat(v);
  }
}

const wrapModes = {
  'ClampToEdgeWrapping': THREE.ClampToEdgeWrapping,
  'RepeatWrapping': THREE.RepeatWrapping,
  'MirroredRepeatWrapping': THREE.MirroredRepeatWrapping,
};

const texture = textures[0]

function updateTexture() {
  texture.needsUpdate = true;
}

const gui = new GUI();
gui.add(new StringToNumberHelper(texture, 'wrapS'), 'value', wrapModes)
  .name('texture.wrapS')
  .onChange(updateTexture);
gui.add(new StringToNumberHelper(texture, 'wrapT'), 'value', wrapModes)
  .name('texture.wrapT')
  .onChange(updateTexture);
gui.add(texture.repeat, 'x', 0, 5, .01).name('texture.repeat.x');
gui.add(texture.repeat, 'y', 0, 5, .01).name('texture.repeat.y');
gui.add(texture.offset, 'x', -2, 2, .01).name('texture.offset.x');
gui.add(texture.offset, 'y', -2, 2, .01).name('texture.offset.y');
gui.add(texture.center, 'x', -.5, 1.5, .01).name('texture.center.x');
gui.add(texture.center, 'y', -.5, 1.5, .01).name('texture.center.y');
gui.add(new DegRadHelper(texture, 'rotation'), 'value', -360, 360)
  .name('texture.rotation');

</script>