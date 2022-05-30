import * as THREE from 'three';
import Wheel from './Wheel';

export default function Car(vechicleColors, zoom) {
    const car = new THREE.Group();
    const color =
        vechicleColors[Math.floor(Math.random() * vechicleColors.length)];

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60 * zoom, 30 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color, flatShading: true })
    );
    main.position.z = 12 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33 * zoom, 24 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true })
    );
    cabin.position.x = 6 * zoom;
    cabin.position.z = 25.5 * zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    const frontWheel = new Wheel(zoom);
    console.log(frontWheel);
    frontWheel.position.x = -18 * zoom;
    car.add(frontWheel);

    const backWheel = new Wheel(zoom);
    backWheel.position.x = 18 * zoom;
    car.add(backWheel);

    car.castShadow = true;
    car.receiveShadow = false;

    const window = new THREE.Mesh(
        new THREE.BoxBufferGeometry(28 * zoom, 26 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color: '#343536', flatShading: true })
    );
    window.position.z = 22 * zoom;
    window.position.x = 6 * zoom;
    window.castShadow = true;
    window.receiveShadow = true;
    car.add(window);

    const windowFront = new THREE.Mesh(
        new THREE.BoxBufferGeometry(32 * zoom, 18 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color: '#343536', flatShading: true })
    );
    windowFront.position.z = 22 * zoom;
    windowFront.position.x = 7 * zoom;
    windowFront.castShadow = true;
    windowFront.receiveShadow = true;
    car.add(windowFront);

    const mirror = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5 * zoom, 40 * zoom, 5 * zoom),
        new THREE.MeshPhongMaterial({ color, flatShading: true })
    );
    mirror.position.z = 17 * zoom;
    mirror.position.x = -7 * zoom;
    mirror.castShadow = true;
    mirror.receiveShadow = true;
    car.add(mirror);

    return car;
}
