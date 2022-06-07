import * as THREE from 'three';

export default function Coin(zoom) {
    const coin = new THREE.Group();
    coin.name = 'Coin'

    const base = new THREE.Mesh(
        new THREE.BoxBufferGeometry(8 * zoom, 14 * zoom, 6 * zoom),
        new THREE.MeshLambertMaterial({ color: '#ffc800', flatShading: true })
    );
    base.position.z = 2 * zoom;

    const base2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(14 * zoom, 8 * zoom, 6 * zoom),
        new THREE.MeshLambertMaterial({ color: '#ffc800', flatShading: true })
    );
    base2.position.z = 2 * zoom;

    const top = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 6 * zoom, 6 * zoom),
        new THREE.MeshLambertMaterial({ color: '#ffae00', flatShading: true })
    );
    top.position.z = 3 * zoom;

    coin.add(base, base2, top);

    return coin;
}
