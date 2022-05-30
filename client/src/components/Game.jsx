import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Chicken from '../generators/Chicken';
import Grass from '../generators/Ground/Grass';
import Road from '../generators/Ground/Road';
import Rails from '../generators/Ground/Rails';
import Three from '../generators/Items/Three';
import Car from '../generators/Items/Car';

export default function Game() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#141517');

        const distance = 500;
        let height;

        const camera = new THREE.OrthographicCamera(
            window.innerWidth / -2,
            window.innerWidth / 2,
            window.innerHeight / 2,
            window.innerHeight / -2,
            0.1,
            10000
        );

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        scene.add(hemiLight);

        const initialDirLightPositionX = -100;
        const initialDirLightPositionY = -100;
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(
            initialDirLightPositionX,
            initialDirLightPositionY,
            200
        );
        dirLight.castShadow = true;
        scene.add(dirLight);

        const backLight = new THREE.DirectionalLight(0x000000, 0.4);
        backLight.position.set(200, 200, 50);
        backLight.castShadow = true;
        scene.add(backLight);

        camera.rotation.x = (50 * Math.PI) / 180;
        camera.rotation.y = (20 * Math.PI) / 180;
        camera.rotation.z = (10 * Math.PI) / 180;

        const initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
        const initialCameraPositionX =
            Math.tan(camera.rotation.y) *
            Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);
        camera.position.y = initialCameraPositionY;
        camera.position.x = initialCameraPositionX;
        camera.position.z = distance;

        const zoom = 2;
        const positionWidth = 42;
        const columns = 17;
        const boardWidth = positionWidth * columns;

        const vechicleColors = [0xa52523, 0xbdb638, 0x78b14b, 0x1a5b9c];

        // Test scene add ==============================================================================

        scene.add(new Rails(zoom, boardWidth, positionWidth), Chicken(zoom), new Car(vechicleColors, zoom));

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        renderer.render(scene, camera);
    }, []);

    return <div ref={mountRef} />;
}
