import * as THREE from 'three'

export default (canvas: HTMLCanvasElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    canvas,

  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return {
    scene, camera, renderer
  };
}