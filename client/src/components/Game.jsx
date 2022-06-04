import React, { useRef, useEffect, useState } from 'react';
import style from './style.module.css';
import * as THREE from 'three';
import Chicken from '../generators/Chicken';
import Grass from '../generators/Ground/Grass';
import Road from '../generators/Ground/Road';
import Rails from '../generators/Ground/Rails';
import Water from '../generators/Ground/Water';
import Car from '../generators/Items/Car';
import Truck from '../generators/Items/Truck';
import generateLanes from '../generators/generateLanes';
// import animate from '../generators/animate';
import Lane from '../generators/Lane';
import Restart from './Restart/Restart';


export default function Game() {
    const mountRef = useRef(null);
    const [isDead, setIsDead] = useState(false);
    const [restart, setRestart] = useState(false);
    let localIsDead = false;
    let lanes;
    const scene = new THREE.Scene();

    useEffect(() => {
        scene.background = new THREE.Color('#141517');

        const distance = 500;
        let height;
        let cameraSpeed = 1.5;
        let positionY;
        let stepTime = 200;
        let chickenSize = 15;

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

        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        var d = 300;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

        // ========================================> PointLight

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
        const chicken = new Chicken(zoom);
        scene.add(chicken);
        // =============================================================================================

        let currentLane;
        let currentColumn;

        let previousTimestamp;
        let startMoving;
        let moves;
        let stepStartTimestamp;

        const initaliseValues = () => {
            lanes = generateLanes(
                zoom,
                boardWidth,
                positionWidth,
                scene,
                vechicleColors,
                height
            );
            currentLane = 0;
            currentColumn = Math.floor(columns / 2);

            previousTimestamp = null;

            startMoving = false;
            moves = [];
            // stepStartTimestamp;

            chicken.position.x = 0;
            chicken.position.y = 0;

            camera.position.y = initialCameraPositionY;
            camera.position.x = initialCameraPositionX;

            dirLight.position.x = initialDirLightPositionX;
            dirLight.position.y = initialDirLightPositionY;
            console.log(lanes);
        };

        initaliseValues();

        const addLane = () => {
            const index = lanes.length;
            const lane = new Lane(
                index,
                zoom,
                boardWidth,
                positionWidth,
                vechicleColors,
                height
            );
            lane.mesh.position.y = index * positionWidth * zoom;
            lane.mesh.castShadow = true;
            scene.add(lane.mesh);
            lanes.push(lane);
        };

        function move(direction) {
            const finalPositions = moves.reduce(
                (position, move) => {
                    if (move === 'forward')
                        return {
                            lane: position.lane + 1,
                            column: position.column,
                        };
                    if (move === 'backward')
                        return {
                            lane: position.lane - 1,
                            column: position.column,
                        };
                    if (move === 'left')
                        return {
                            lane: position.lane,
                            column: position.column - 1,
                        };
                    if (move === 'right')
                        return {
                            lane: position.lane,
                            column: position.column + 1,
                        };
                },
                { lane: currentLane, column: currentColumn }
            );
            if (direction === 'forward') {
                if (
                    lanes[finalPositions.lane + 1].type === 'forest' &&
                    lanes[finalPositions.lane + 1].occupiedPositions.has(
                        finalPositions.column
                    )
                )
                    return;
                if (!stepStartTimestamp) startMoving = true;
                addLane();
            } else if (direction === 'backward') {
                if (finalPositions.lane === 0) return;
                if (
                    lanes[finalPositions.lane - 1].type === 'forest' &&
                    lanes[finalPositions.lane - 1].occupiedPositions.has(
                        finalPositions.column
                    )
                )
                    return;
                if (!stepStartTimestamp) startMoving = true;
            } else if (direction === 'left') {
                if (finalPositions.column === 0) return;
                if (
                    lanes[finalPositions.lane].type === 'forest' &&
                    lanes[finalPositions.lane].occupiedPositions.has(
                        finalPositions.column - 1
                    )
                )
                    return;
                if (!stepStartTimestamp) startMoving = true;
            } else if (direction === 'right') {
                if (finalPositions.column === columns - 1) return;
                if (
                    lanes[finalPositions.lane].type === 'forest' &&
                    lanes[finalPositions.lane].occupiedPositions.has(
                        finalPositions.column + 1
                    )
                )
                    return;
                if (!stepStartTimestamp) startMoving = true;
            }
            moves.push(direction);
        }

        window.addEventListener('keydown', (event) => {
            if (event.keyCode == '38' && localIsDead === false) {
                // up arrow
                if (chicken.scale.z > 0.8) {
                    chicken.scale.z -= 0.2;
                }
            } else if (event.keyCode == '40' && localIsDead === false) {
                // down arrow
                if (chicken.scale.z > 0.8) {
                    chicken.scale.z -= 0.2;
                }
            } else if (event.keyCode == '37' && localIsDead === false) {
                // left arrow
                if (chicken.scale.z > 0.8) {
                    chicken.scale.z -= 0.2;
                }
            } else if (event.keyCode == '39' && localIsDead === false) {
                // right arrow
                if (chicken.scale.z > 0.8) {
                    chicken.scale.z -= 0.2;
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.keyCode == '38' && localIsDead === false) {
                chicken.scale.z = 1;
                move('forward');
                cameraSpeed += 0.01;
            } else if (event.keyCode == '40' && localIsDead === false) {
                // down arrow
                chicken.scale.z = 1;
                move('backward');
            } else if (event.keyCode == '37' && localIsDead === false) {
                // left arrow
                chicken.scale.z = 1;
                move('left');
            } else if (event.keyCode == '39' && localIsDead === false) {
                // right arrow
                chicken.scale.z = 1;
                move('right');
            }
        });

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        dirLight.target = chicken;

        // requestAnimationFrame( animate );
        function animate(timestamp) {
            requestAnimationFrame(animate);

            if (!previousTimestamp) previousTimestamp = timestamp;
            const delta = timestamp - previousTimestamp;
            previousTimestamp = timestamp;

            // Animate cars and trucks moving on the lane
            lanes.forEach((lane) => {
                if (lane.type === 'car' || lane.type === 'truck') {
                    const aBitBeforeTheBeginingOfLane =
                        (-boardWidth * zoom) / 2 - positionWidth * 2 * zoom;
                    const aBitAfterTheEndOFLane =
                        (boardWidth * zoom) / 2 + positionWidth * 2 * zoom;
                    lane.vechicles.forEach((vechicle) => {
                        if (lane.direction) {
                            vechicle.position.x =
                                vechicle.position.x <
                                aBitBeforeTheBeginingOfLane
                                    ? aBitAfterTheEndOFLane
                                    : (vechicle.position.x -=
                                          (lane.speed / 16) * delta);
                        } else {
                            vechicle.position.x =
                                vechicle.position.x > aBitAfterTheEndOFLane
                                    ? aBitBeforeTheBeginingOfLane
                                    : (vechicle.position.x +=
                                          (lane.speed / 16) * delta);
                        }
                    });
                }

                if (lane.type === 'river') {
                    const aBitBeforeTheBeginingOfLane =
                        (-boardWidth * zoom) / 2 - positionWidth * 2 * zoom;
                    const aBitAfterTheEndOFLane =
                        (boardWidth * zoom) / 2 + positionWidth * 2 * zoom;
                    lane.rafts.forEach((rafts) => {
                        if (lane.direction) {
                            rafts.position.x =
                                rafts.position.x < aBitBeforeTheBeginingOfLane
                                    ? aBitAfterTheEndOFLane
                                    : (rafts.position.x -=
                                          (lane.speed / 16) * delta);
                        } else {
                            rafts.position.x =
                                rafts.position.x > aBitAfterTheEndOFLane
                                    ? aBitBeforeTheBeginingOfLane
                                    : (rafts.position.x +=
                                          (lane.speed / 16) * delta);
                        }
                    });
                }
            });

            if (startMoving) {
                stepStartTimestamp = timestamp;
                startMoving = false;
            }

            if (stepStartTimestamp) {
                const moveDeltaTime = timestamp - stepStartTimestamp;
                const moveDeltaDistance =
                    Math.min(moveDeltaTime / stepTime, 1) *
                    positionWidth *
                    zoom;
                const jumpDeltaDistance =
                    Math.sin(Math.min(moveDeltaTime / stepTime, 1) * Math.PI) *
                    8 *
                    zoom;
                switch (moves[0]) {
                    case 'forward': {
                        const positionY =
                            currentLane * positionWidth * zoom +
                            moveDeltaDistance;
                        if (chicken.position.y - 600 > camera.position.y) {
                            camera.position.y =
                                initialCameraPositionY + positionY;
                        }
                        dirLight.position.y =
                            initialDirLightPositionY + positionY;
                        chicken.position.y = positionY; // initial chicken position is 0

                        chicken.position.z = jumpDeltaDistance;
                        chicken.rotation.z = 0;
                        break;
                    }
                    case 'backward': {
                        positionY =
                            currentLane * positionWidth * zoom -
                            moveDeltaDistance;
                        chicken.position.y = positionY;
                        chicken.position.z = jumpDeltaDistance;
                        chicken.rotation.z = 3.15;
                        dirLight.position.y =
                            initialDirLightPositionY + positionY;
                        break;
                    }
                    case 'left': {
                        const positionX =
                            (currentColumn * positionWidth +
                                positionWidth / 2) *
                                zoom -
                            (boardWidth * zoom) / 2 -
                            moveDeltaDistance;
                        camera.position.x = initialCameraPositionX + positionX;
                        dirLight.position.x =
                            initialDirLightPositionX + positionX;
                        chicken.position.x = positionX; // initial chicken position is 0
                        chicken.position.z = jumpDeltaDistance;
                        chicken.rotation.z = 1.6;
                        break;
                    }
                    case 'right': {
                        const positionX =
                            (currentColumn * positionWidth +
                                positionWidth / 2) *
                                zoom -
                            (boardWidth * zoom) / 2 +
                            moveDeltaDistance;
                        camera.position.x = initialCameraPositionX + positionX;
                        dirLight.position.x =
                            initialDirLightPositionX + positionX;
                        chicken.position.x = positionX;
                        chicken.position.z = jumpDeltaDistance;
                        chicken.rotation.z = 4.7;

                        break;
                    }
                }
                // Once a step has ended
                if (moveDeltaTime > stepTime) {
                    switch (moves[0]) {
                        case 'forward': {
                            currentLane++;
                            break;
                        }
                        case 'backward': {
                            currentLane--;
                            break;
                        }
                        case 'left': {
                            currentColumn--;
                            break;
                        }
                        case 'right': {
                            currentColumn++;
                            break;
                        }
                    }
                    moves.shift();
                    // If more steps are to be taken then restart counter otherwise stop stepping
                    stepStartTimestamp = moves.length === 0 ? null : timestamp;
                }
            }

            // Hit test
            if (
                lanes[currentLane].type === 'car' ||
                lanes[currentLane].type === 'truck'
            ) {
                const chickenMinX =
                    chicken.position.x - (chickenSize * zoom) / 2;
                const chickenMaxX =
                    chicken.position.x + (chickenSize * zoom) / 2;
                const vechicleLength = { car: 60, truck: 105 }[
                    lanes[currentLane].type
                ];
                lanes[currentLane].vechicles.forEach((vechicle) => {
                    const carMinX =
                        vechicle.position.x - (vechicleLength * zoom) / 2;
                    const carMaxX =
                        vechicle.position.x + (vechicleLength * zoom) / 2;
                    if (chickenMaxX > carMinX && chickenMinX < carMaxX) {
                        localIsDead = true;
                        setIsDead(true);
                        chicken.scale.z = 0.2;
                        cameraSpeed = 0;
                    }
                });
            }
            renderer.render(scene, camera);
        }

        let timer = setInterval(() => {
            if (currentLane > 0) {
                camera.position.y += cameraSpeed;
            }
        }, 15);

        if (chicken.position.y - 600 > camera.position.y) {
            clearInterval(timer);
        }
        
        const getRestart = () => {
            lanes.forEach((lane) => {
                scene.remove(lane.mesh)
            });
            scene.clear()
            initaliseValues();
        };

        if (restart === true) {
            console.log('lanes before', lanes);
            getRestart();
            console.log('lanes after', lanes)
        }

        requestAnimationFrame(animate);
    }, []);

    return (
        <>
            <div className={style.game} ref={mountRef} />
            {isDead === true ? (
                <div className={style.end}>
                    <Restart restart={restart} setRestart={setRestart}/>
                </div>
            ) : null}
        </>
    );
}
