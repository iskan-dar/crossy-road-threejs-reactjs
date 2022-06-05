import * as THREE from 'three';
import Wheel from './Wheel';

export default function Car(vechicleColors, zoom) {
    const car = new THREE.Group();
    const color =
        vechicleColors[Math.floor(Math.random() * vechicleColors.length)];

    if (color === 0xbdb638) {
        const taxiTable = new THREE.Mesh(
            new THREE.BoxBufferGeometry(6 * zoom, 10 * zoom, 6 * zoom),
            new THREE.MeshPhongMaterial({ color, flatShading: true })
        );
        taxiTable.position.z = 34*zoom
        car.add(taxiTable)
    }

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60 * zoom, 30 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color, flatShading: true })
    );
    main.position.z = 12 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    const flashLightL = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 4 * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: '#ffffff', flatShading: true })
    );
    flashLightL.position.x = -28 * zoom;
    flashLightL.position.z = 14 * zoom;
    flashLightL.position.y = -10 * zoom;
    car.add(flashLightL);

    const flashLightR = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 4 * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: '#ffffff', flatShading: true })
    );
    flashLightR.position.x = -28 * zoom;
    flashLightR.position.z = 14 * zoom;
    flashLightR.position.y = 10 * zoom;
    car.add(flashLightR);

    const backLightL = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 4 * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: '#FF1300', flatShading: true })
    );
    backLightL.position.x = 28 * zoom;
    backLightL.position.z = 14 * zoom;
    backLightL.position.y = -10 * zoom;
    car.add(backLightL);

    const backLightR = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 4 * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: '#FF1300', flatShading: true })
    );
    backLightR.position.x = 28 * zoom;
    backLightR.position.z = 14 * zoom;
    backLightR.position.y = 10 * zoom;
    car.add(backLightR);

    const bamperFront = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 32 * zoom, 3 * zoom),
        new THREE.MeshPhongMaterial({ color: '#6F6E6E', flatShading: true })
    );
    bamperFront.position.x = -28 * zoom;
    bamperFront.position.z = 7 * zoom;
    car.add(bamperFront);

    const bamperRear = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 32 * zoom, 3 * zoom),
        new THREE.MeshPhongMaterial({ color: '#6F6E6E', flatShading: true })
    );
    bamperRear.position.x = 28 * zoom;
    bamperRear.position.z = 7 * zoom;
    car.add(bamperRear);

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
        new THREE.BoxBufferGeometry(34 * zoom, 18 * zoom, 15 * zoom),
        new THREE.MeshPhongMaterial({ color: '#343536', flatShading: true })
    );
    windowFront.position.z = 22 * zoom;
    windowFront.position.x = 6 * zoom;
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
