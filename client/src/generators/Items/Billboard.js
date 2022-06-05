import * as THREE from 'three';
import logoRedux from '../Texts/logoRedux';

export default function Billboard(zoom) {
    const billboard = new THREE.Group();

    const stand = new THREE.Mesh(
        new THREE.BoxBufferGeometry(7 * zoom, 7 * zoom, 250 * zoom),
        new THREE.MeshPhongMaterial({ color: '#454545', flatShading: true })
    );

    const board = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100 * zoom, 4 * zoom, 60 * zoom),
        new THREE.MeshPhongMaterial({ color: '#454545', flatShading: true })
    );

    board.position.z = 100 * zoom
    board.position.y = -5 * zoom

    const boardColor = new THREE.Mesh(
        new THREE.BoxBufferGeometry(94 * zoom, 4 * zoom, 54 * zoom),
        new THREE.MeshPhongMaterial({ color: '#B845F2', flatShading: true })
    );

    boardColor.position.z = 100 * zoom
    boardColor.position.y = -6 * zoom


    
    const logo = new logoRedux('Redux')
    logo.rotation.x = 1.6
    logo.position.x = -60
    logo.position.z = 95 * zoom
    logo.position.y = -7
    
    billboard.add(stand, board, boardColor, logo);

    return billboard;
}
