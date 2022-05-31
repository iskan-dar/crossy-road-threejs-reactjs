import * as THREE from 'three';

export default function Chicken(zoom) {
    const chickenSize = 15;

    const chicken = new THREE.Group();
    chicken.name = 'Chicken';

    const body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(
            chickenSize * zoom,
            chickenSize * zoom,
            20 * zoom
        ),
        new THREE.MeshPhongMaterial({ color: '#ffffff', flatShading: true })
    );
    body.position.z = 10 * zoom;
    body.castShadow = true;
    body.receiveShadow = true;
    chicken.add(body);

    const rowel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 4 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#f50400', flatShading: true })
    );
    rowel.position.z = 21 * zoom;
    rowel.castShadow = true;
    rowel.receiveShadow = false;
    chicken.add(rowel);

    const leftEye = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 3 * zoom, 3 * zoom),
        new THREE.MeshLambertMaterial({ color: '#05010d', flatShading: true })
    );
    leftEye.position.z = 15 * zoom;
    leftEye.position.x = 8 * zoom;
    leftEye.castShadow = true;
    leftEye.receiveShadow = false;
    chicken.add(leftEye);

    const rightEye = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 3 * zoom, 3 * zoom),
        new THREE.MeshLambertMaterial({ color: '#05010d', flatShading: true })
    );
    rightEye.position.z = 15 * zoom;
    rightEye.position.x = -8 * zoom;
    rightEye.castShadow = true;
    rightEye.receiveShadow = false;
    chicken.add(rightEye);

    const beak = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 4 * zoom, 5 * zoom),
        new THREE.MeshLambertMaterial({ color: '#ffe100', flatShading: true })
    );
    beak.position.z = 18 * zoom;
    beak.position.y = -15 * zoom;
    beak.position.x = 2 * zoom;
    beak.castShadow = true;
    beak.receiveShadow = false;
    chicken.add(beak);

    return chicken;
}
