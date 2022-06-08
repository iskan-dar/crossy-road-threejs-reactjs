import * as THREE from 'three';
export default function Barrier(zoom) {
  const barrier = new THREE.Group();
  const color = ['#83272d', '#ffffff']

  barrier.name = 'Barrier';

  for (let i = 0; i < 9; i++) {
    const block = new THREE.Mesh(
      new THREE.BoxBufferGeometry(8 * zoom, 5 * zoom, 7 * zoom),
      new THREE.MeshLambertMaterial({ color: (i % 2 === 0 ? color[0] : color[1]), flatShading: true })
    )
    block.position.x = -210;
    block.position.y = -32;
    block.position.z = i * 14;
    barrier.add(block)
  }

  const display = new THREE.Mesh(
    new THREE.BoxBufferGeometry(35 * zoom, 5 * zoom, 15 * zoom),
    new THREE.MeshLambertMaterial({ color: '#5b676d', flatShading: true })
  )
  display.position.x = -210;
  display.position.y = -36;
  display.position.z = 90;
  barrier.add(display)


  const rightStopSignal = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5 * zoom, 10 * zoom, 5 * zoom),
    new THREE.MeshLambertMaterial({ color: '#00ff00', flatShading: true })
  )
  rightStopSignal.name = 'rightStopSignal';
  rightStopSignal.position.x = -190;
  rightStopSignal.position.y = -36;
  rightStopSignal.position.z = 90;
  barrier.add(rightStopSignal)

  const leftStopSignal = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5 * zoom, 10 * zoom, 5 * zoom),
    new THREE.MeshLambertMaterial({ color: '#00ff00', flatShading: true })
  )
  leftStopSignal.name = 'leftStopSignal';
  leftStopSignal.position.x = -230;
  leftStopSignal.position.y = -36;
  leftStopSignal.position.z = 90;
  barrier.add(leftStopSignal)


  return barrier
}
