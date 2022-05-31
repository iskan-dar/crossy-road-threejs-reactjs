import * as THREE from 'three';

export default function Tree(zoom, height) {
    const treeHeights = [20, 45, 60, 30, 75];

    const tree = new THREE.Group();

    const trunk = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 15 * zoom, 20 * zoom),
        new THREE.MeshLambertMaterial({ color: '#8a3f27', flatShading: true })
    );
    trunk.position.z = 10 * zoom;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);

    height = treeHeights[Math.floor(Math.random() * treeHeights.length)];

    const crown = new THREE.Mesh(
        new THREE.BoxBufferGeometry(30 * zoom, 30 * zoom, height * zoom),
        new THREE.MeshLambertMaterial({ color: 'green', flatShading: true })
    );
    crown.position.z = (height / 2 + 20) * zoom;
    crown.castShadow = true;
    crown.receiveShadow = false;
    tree.add(crown);

    return tree;
}
