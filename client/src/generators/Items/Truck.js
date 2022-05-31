import * as THREE from 'three';
import Wheel from './Wheel';

export default function Truck(zoom, vechicleColors) {
    const truck = new THREE.Group({ name: 'Truck' });
    truck.name = 'Truck';
    const color =
        vechicleColors[Math.floor(Math.random() * vechicleColors.length)];

    const base = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100 * zoom, 25 * zoom, 5 * zoom),
        new THREE.MeshLambertMaterial({ color: 0xb4c6fc, flatShading: true })
    );
    base.position.z = 10 * zoom;
    truck.add(base);

    const cargo = new THREE.Mesh(
        new THREE.BoxBufferGeometry(75 * zoom, 35 * zoom, 40 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xb4c6fc, flatShading: true })
    );
    cargo.position.x = 15 * zoom;
    cargo.position.z = 30 * zoom;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truck.add(cargo);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(25 * zoom, 30 * zoom, 30 * zoom),
        new THREE.MeshPhongMaterial({ color, flatShading: true }) // back
    );
    cabin.position.x = -40 * zoom;
    cabin.position.z = 20 * zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    truck.add(cabin);

    const sideGlass = new THREE.Mesh(
        new THREE.BoxBufferGeometry(15 * zoom, 31 * zoom, 10 * zoom),
        new THREE.MeshPhongMaterial({ color: '#000000', flatShading: true }) // back
    );
    sideGlass.position.x = -45.5 * zoom;
    sideGlass.position.z = 25 * zoom;
    sideGlass.castShadow = true;
    sideGlass.receiveShadow = true;
    truck.add(sideGlass);

    const topBox1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12 * zoom, 25 * zoom, 8 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xb4c6fc, flatShading: true }) // back
    );
    topBox1.position.x = -35 * zoom;
    topBox1.position.z = 35 * zoom;
    topBox1.castShadow = true;
    topBox1.receiveShadow = true;
    truck.add(topBox1);

    const topBox2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6 * zoom, 25 * zoom, 12 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xb4c6fc, flatShading: true }) // back
    );
    topBox2.position.x = -31 * zoom;
    topBox2.position.z = 35 * zoom;
    topBox2.castShadow = true;
    topBox2.receiveShadow = true;
    truck.add(topBox2);

    const mirrors = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 38 * zoom, 6 * zoom),
        new THREE.MeshPhongMaterial({ color, flatShading: true }) // back
    );
    mirrors.position.x = -51 * zoom;
    mirrors.position.z = 17 * zoom;
    mirrors.castShadow = true;
    mirrors.receiveShadow = true;
    truck.add(mirrors);

    const flashLightL = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12 * zoom, 4 * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: '#ffffff', flatShading: true }) // back
    );
    flashLightL.position.z = 8 * zoom;
    flashLightL.position.x = -47 * zoom;
    flashLightL.position.y = -10 * zoom;
    truck.add(flashLightL);

    const flashLightR = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12 * zoom, 4 * zoom, 4 * zoom),
        new THREE.MeshPhongMaterial({ color: '#ffffff', flatShading: true }) // back
    );
    flashLightR.position.z = 8 * zoom;
    flashLightR.position.x = -47 * zoom;
    flashLightR.position.y = 10 * zoom;
    truck.add(flashLightR);

    const frontWheel = new Wheel(zoom);
    frontWheel.position.x = -38 * zoom;
    truck.add(frontWheel);

    const middleWheel = new Wheel(zoom);
    middleWheel.position.x = -10 * zoom;
    truck.add(middleWheel);

    const backWheel = new Wheel(zoom);
    backWheel.position.x = 30 * zoom;
    truck.add(backWheel);

    return truck;
}
