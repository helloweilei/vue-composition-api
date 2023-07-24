import * as THREE from 'three'

export default (color = 0x0000ff) => {
  const points: Array<THREE.Vector3> = []
  points.push(new THREE.Vector3(-10, 0, 0))
  points.push(new THREE.Vector3(0, 10, 0))
  points.push(new THREE.Vector3(10, 0, 0))

  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color })
  const line = new THREE.Line(geometry, material)

  return line
}