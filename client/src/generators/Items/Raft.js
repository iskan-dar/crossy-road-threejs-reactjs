import * as THREE from 'three';

export default function Raft(zoom, positionWidth) {
    let random = Math.floor(2 + Math.random() * 3);

    const raft = new THREE.Mesh(
        new THREE.BoxBufferGeometry(
            positionWidth * random * zoom,
            30 * zoom,
            5 * zoom
        ),
        new THREE.MeshPhongMaterial({ color: '#9c6644', flatShading: true })
    );
    raft.position.z = 6 * zoom;
    raft.position.y = -6 * zoom;
    return raft;
}