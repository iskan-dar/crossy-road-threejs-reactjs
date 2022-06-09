import * as THREE from 'three';

export default function Road(zoom, boardWidth, positionWidth) {
    const road = new THREE.Group();

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
    road.add(middle);

    const left = createSection(0x393d49);
    left.position.x = -boardWidth * zoom;
    road.add(left);

    const right = createSection(0x393d49);
    right.position.x = boardWidth * zoom;
    road.add(right);

    for (let i = 0; i < 12; i++) {
        const whiteStripe = new THREE.Mesh(
            new THREE.BoxBufferGeometry(20 * zoom, 5 * zoom, 1 * zoom),
            new THREE.MeshLambertMaterial({ color: '#98A1B8', flatShading: true })
        );
        whiteStripe.position.z = 1 * zoom;
        whiteStripe.position.x = -660 + (i * 60) * zoom;
        road.add(whiteStripe);
    }

    return road;
}
