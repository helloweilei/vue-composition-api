import * as THREE from 'three'

export default (canvas?: HTMLCanvasElement) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

  const renderer = new THREE.WebGLRenderer({
    canvas,

  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return {
    scene, camera, renderer
  };
}