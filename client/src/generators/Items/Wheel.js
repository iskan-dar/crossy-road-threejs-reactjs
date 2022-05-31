import * as THREE from 'three';

export default function Wheel(zoom) {
    const wheel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12 * zoom, 33 * zoom, 12 * zoom),
        new THREE.MeshLambertMaterial({ color: "#212121", flatShading: true })
    );
    wheel.position.z = 6 * zoom;
    return wheel;
}
