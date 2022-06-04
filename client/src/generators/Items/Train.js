import React from 'react'
import * as THREE from 'three'

export default function Train(zoom) {
    const train = new THREE.Group({ name: 'Train' });
    train.name = 'Train';

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100 * zoom, 25 * zoom, 50 * zoom),
        new THREE.MeshPhongMaterial({ color: 0x3a86ff, flatShading: true })
    );
    main.position.x = 15 * zoom;
    main.position.z = 30 * zoom;

    train.add(main);

    return train;
}


