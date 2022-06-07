import * as THREE from 'three';
import logoRedux from '../Texts/logoRedux';

export default function Billboard(zoom, text, color, posX, fontSize) {
    const billboard = new THREE.Group();

    const stand = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3 * zoom, 3 * zoom, 250 * zoom),
        new THREE.MeshPhongMaterial({ color: '#858585', flatShading: true })
    );

    const standBase = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 5 * zoom, 30 * zoom),
        new THREE.MeshPhongMaterial({ color: '#454545', flatShading: true })
    )

    const plank = new THREE.Mesh(
        new THREE.BoxBufferGeometry(90 * zoom, 10 * zoom, 2 * zoom),
        new THREE.MeshPhongMaterial({ color: '#454545', flatShading: true })
    )
    plank.position.y = -7*zoom
    plank.position.z = 70*zoom


    const board = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100 * zoom, 4 * zoom, 60 * zoom),
        new THREE.MeshPhongMaterial({ color: '#858585', flatShading: true })
    );

    board.position.z = 100 * zoom
    board.position.y = -5 * zoom

    const boardColor = new THREE.Mesh(
        new THREE.BoxBufferGeometry(94 * zoom, 4 * zoom, 54 * zoom),
        new THREE.MeshPhongMaterial({ color, flatShading: true })
    );

    boardColor.position.z = 100 * zoom
    boardColor.position.y = -6 * zoom


    
    const logo = new logoRedux(text, fontSize)
    logo.rotation.x = 1.6
    logo.position.x = posX
    logo.position.z = 95 * zoom
    logo.position.y = -7
    
    billboard.add(stand, standBase, plank, board, boardColor, logo);

    return billboard;
}
