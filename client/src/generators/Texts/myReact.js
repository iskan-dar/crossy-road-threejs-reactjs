import * as THREE from 'three';
import { FontLoader } from '../../../node_modules/three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from '../../../node_modules/three/examples/jsm/geometries/TextGeometry'; 

export default function myReact(zoom) {
    const reactText = new THREE.Group()

    const loader = new FontLoader();

    loader.load( '/font.json', function ( font ) {

	const geometry = new TextGeometry( 'react', {
		font: font,
		size: 100,
		height: 10,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 2,
		bevelOffset: 2,
		bevelSegments: 2
	} );

    const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({ color: '#5ed3f3', flatShading: true })
    );

    reactText.add(mesh)
} );


// console.log('123123', reactText)

return reactText
}
