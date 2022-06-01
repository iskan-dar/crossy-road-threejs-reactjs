import * as THREE from 'three';

export default function Water(zoom, boardWidth, positionWidth) {
    const water = new THREE.Group();

    const createSection = (color) =>
        new THREE.Mesh(
            new THREE.BoxBufferGeometry(
                boardWidth * zoom,
                positionWidth * zoom,
                3 * zoom
            ),
            new THREE.MeshPhongMaterial({ color })
        );


    const middle = createSection(0x4cc9f0);
    middle.receiveShadow = true;
    water.add(middle);

    const left = createSection(0x00b4d8);
    left.position.x = -boardWidth * zoom;
    water.add(left);

    const right = createSection(0x00b4d8);
    right.position.x = boardWidth * zoom;
    water.add(right);

    water.position.z = -1 * zoom;
    return water;
}
