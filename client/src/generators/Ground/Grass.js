import * as THREE from 'three';

export default function Grass(zoom, boardWidth, positionWidth) {
    const grass = new THREE.Group();
    grass.name = "Grass"

    const createSection = (color) =>
        new THREE.Mesh(
            new THREE.BoxBufferGeometry(
                boardWidth * zoom,
                positionWidth * zoom,
                3 * zoom
            ),
            new THREE.MeshPhongMaterial({ color })
        );

    const middle = createSection(0xbaf455);
    middle.receiveShadow = true;
    grass.add(middle);

    const left = createSection(0x99c846);
    left.position.x = -boardWidth * zoom;
    grass.add(left);

    const right = createSection(0x99c846);
    right.position.x = boardWidth * zoom;
    grass.add(right);

    grass.position.z = 1.5 * zoom;
    return grass;
}
