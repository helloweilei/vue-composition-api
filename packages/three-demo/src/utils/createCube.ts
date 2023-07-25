import * as THREE from 'three'

export default () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
