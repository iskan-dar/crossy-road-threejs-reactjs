import * as THREE from 'three';

export default function Pad(zoom, positionWidth) {
    const pad = new THREE.Group();
    let random = Math.floor(Math.random() * 3)

    const base = new THREE.Mesh(
        new THREE.BoxBufferGeometry(30 * zoom, 30 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color: '#0e9c4b', flatShading: true })
    );

    base.position.z = 1 * zoom;
    base.rotation.z = random
    base.castShadow = true;
    base.receiveShadow = true;

    const top = new THREE.Mesh(
        new THREE.BoxBufferGeometry(
            24 * zoom,
            24 * zoom,
            5 * zoom
        ),
        new THREE.MeshPhongMaterial({ color: '#35cc76', flatShading: true })
    );

    top.position.z = 2 * zoom;
    top.rotation.z = random
    top.receiveShadow = true;

    pad.add(base);
    pad.add(top);

    return pad;
}
