import * as THREE from 'three';
export default function Barrier(zoom) {
  const barrier = new THREE.Group();
  const color = ['#83272d', '#ffffff']
  for (let i = 0; i < 10; i++) {
    const block = new THREE.Mesh(
      new THREE.BoxBufferGeometry(8 * zoom, 5 * zoom, 7 * zoom),
      new THREE.MeshLambertMaterial({ color: (i % 2 === 0 ? color[0] : color[1]), flatShading: true })
    )
    block.position.y = -66;
    block.position.z = i * 14;
    barrier.add(block)
  }

  const display = new THREE.Mesh(
    new THREE.BoxBufferGeometry(35 * zoom, 5 * zoom, 15 * zoom),
    new THREE.MeshLambertMaterial({ color: '#5b676d', flatShading: true })
  )
  display.position.y = -70;
  display.position.z = 90;
  barrier.add(display)
  

  const rightStopSignal = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5 * zoom, 10 * zoom, 5 * zoom),
    new THREE.MeshLambertMaterial({ color: '#d81a31', flatShading: true })
  )
  rightStopSignal.position.x = -20;
  rightStopSignal.position.y = -70;
  rightStopSignal.position.z = 90;
  barrier.add(rightStopSignal)

  const leftStopSignal = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5 * zoom, 10 * zoom, 5 * zoom),
    new THREE.MeshLambertMaterial({ color: '#d81a31', flatShading: true })
  )
  leftStopSignal.position.x = 20;
  leftStopSignal.position.y = -70;
  leftStopSignal.position.z = 90;
  barrier.add(leftStopSignal)


  return barrier
}
