import * as THREE from 'three';

export default function Stones(zoom) {
    let dir
    const stonesHeights = [{dir: 'x', value: 15}, {dir: 'y', value: -15}];

    const stone = new THREE.Group();

    const large = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 15 * zoom, 26 * zoom),
        new THREE.MeshLambertMaterial({ color: '#575957', flatShading: true })
    );
    large.castShadow = true;
    large.receiveShadow = true;
    stone.add(large);

    dir = stonesHeights[Math.floor(Math.random() * stonesHeights.length)];

    const small = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 7 * zoom, 12 * zoom),
        new THREE.MeshLambertMaterial({ color: '#6e736e', flatShading: true })
    );
    small.position[dir.dir] = (dir.value)
    small.castShadow = true;
    small.receiveShadow = false;
    stone.add(small);

    const top = new THREE.Mesh(
        new THREE.BoxBufferGeometry(10 * zoom, 10 * zoom, 5 * zoom), 
        new THREE.MeshLambertMaterial({ color: '#6e736e', flatShading: true })
    )
    top.position.z = 15 * zoom;
    top.position.x = 2 * zoom;
    top.castShadow = true;
    top.receiveShadow = true;
    stone.add(top);

    const top2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(7 * zoom, 5 * zoom, 15 * zoom), 
        new THREE.MeshLambertMaterial({ color: '#838783', flatShading: true })
    )
    top2.position.z = 15 * zoom;
    top2.position.x = -4 * zoom;
    top2.position.y = 3 * zoom;
    top2.castShadow = true;
    top2.receiveShadow = true;
    stone.add(top2);

    return stone;
}
