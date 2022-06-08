import * as THREE from 'three';
import Barrier from './Barrier';

export default function Rails(zoom, boardWidth, positionWidth) {
  const rails = new THREE.Group();

  const createSection = (color) =>
    new THREE.Mesh(
      new THREE.PlaneBufferGeometry(
        boardWidth * zoom,
        positionWidth * zoom
      ),
      new THREE.MeshPhongMaterial({ color })
    );

  const middle = createSection(0x454a59);
  middle.receiveShadow = true;
  rails.add(middle);
  middle.name = 'middleSection';

  const left = createSection(0x393d49);
  left.position.x = -boardWidth * zoom;
  rails.add(left);
  left.name = 'leftSection';

  const right = createSection(0x393d49);
  right.position.x = boardWidth * zoom;
  rails.add(right);
  right.name = 'rightSection';

  const rightRail = new THREE.Mesh(
    new THREE.BoxBufferGeometry(boardWidth * 3 * zoom, 5 * zoom, 3 * zoom),
    new THREE.MeshLambertMaterial({ color: '#9a95b4', flatShading: true })
  );
  rightRail.position.z = 5;
  rightRail.position.y = 20;
  rails.add(rightRail);

  const leftRail = new THREE.Mesh(
    new THREE.BoxBufferGeometry(boardWidth * 3 * zoom, 5 * zoom, 3 * zoom),
    new THREE.MeshLambertMaterial({ color: '#9a95b4', flatShading: true })
  );
  leftRail.position.z = 5;
  leftRail.position.y = -20;
  rails.add(leftRail);

  for (let i = 0; i < 34; i++) {
    const sleeper = new THREE.Mesh(
      new THREE.BoxBufferGeometry(5 * zoom, 30 * zoom, 2 * zoom),
      new THREE.MeshLambertMaterial({ color: '#744441', flatShading: true })
    );
    sleeper.position.z = 1 * zoom;
    sleeper.position.x = -boardWidth * 1.5 + (i * 40) * zoom;
    rails.add(sleeper);
  }

  rails.add(Barrier(zoom));

  return rails;
}
