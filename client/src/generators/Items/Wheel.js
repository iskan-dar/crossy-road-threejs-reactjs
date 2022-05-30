import * as THREE from 'three';

export default function Wheel(zoom) {
    const wheel = new THREE.Group();

    const tyre = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12 * zoom, 33 * zoom, 12 * zoom),
        new THREE.MeshLambertMaterial({ color: '#212121', flatShading: true })
    );
    tyre.position.z = 6 * zoom;
    wheel.add(tyre);

    const rim = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 34 * zoom, 5 * zoom),
        new THREE.MeshLambertMaterial({ color: '#adadad', flatShading: true })
    );
    rim.position.z = 6 * zoom;
    wheel.add(rim);

    return wheel;
}
