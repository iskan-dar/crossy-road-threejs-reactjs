import * as THREE from 'three';

export default function Grass2(zoom, boardWidth, positionWidth) {
    const grass = new THREE.Group();

    const createSection = (color) =>
        new THREE.Mesh(
            new THREE.BoxBufferGeometry(
                boardWidth * zoom,
                positionWidth * zoom,
                3 * zoom
            ),
            new THREE.MeshPhongMaterial({ color })
        );

    const middle = createSection('#1A992D');
    middle.receiveShadow = true;
    grass.add(middle);

    const left = createSection('#157C24');
    left.position.x = -boardWidth * zoom;
    grass.add(left);

    const right = createSection('#157C24');
    right.position.x = boardWidth * zoom;
    grass.add(right);

    grass.position.z = 1.5 * zoom;
    return grass;
}
