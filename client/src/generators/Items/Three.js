import * as THREE from 'three';

export default function Three(zoom, height) {
    const threeHeights = [20, 45, 60, 30, 75];

    const three = new THREE.Group();
    three.name = "Tree"

    const trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 15 * zoom, 20 * zoom),
        new THREE.MeshLambertMaterial({ color: '#8a3f27', flatShading: true })
    );
    trunk.position.z = 10 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    three.add(trunk);

    height = threeHeights[Math.floor(Math.random() * threeHeights.length)];

    const crown = new THREE.Mesh(
        new THREE.BoxBufferGeometry(30 * zoom, 30 * zoom, height * zoom),
        new THREE.MeshLambertMaterial({ color: 'green', flatShading: true })
    );
    crown.position.z = (height / 2 + 20) * zoom;
    crown.castShadow = true;
    crown.receiveShadow = false;
    three.add(crown);

    return three;
}
