/* eslint-disable default-case */
import React, { useRef, useEffect, useState } from 'react';
import style from './style.module.css';
import * as THREE from 'three';
import Chicken from '../generators/Chicken';
import generateLanes from '../generators/generateLanes';
import Lane from '../generators/Lane';
import myReact from '../generators/Texts/myReact';
import Restart from './Restart/Restart';
import Score from './Score/Score';

import Billboard from '../generators/Items/Billboard';

export default function Game() {
    const mountRef = useRef(null);
    const [isDead, setIsDead] = useState(false);
    const [restart, setRestart] = useState(false);
    const [score, setScore] = useState(0)
    let localIsDead = false;
    let lanes;
    const scene = new THREE.Scene();
    const zoom = 2;
    let chickenSize = 12;
    let moves;
    const chicken = new Chicken(zoom)
    const distance = 500;
    let height;
    let cameraSpeed = 0.5;
    let positionY;
    let stepTime = 200;
    let currentLane;
    let currentColumn;
    let previousTimestamp;
    let startMoving;
    let stepStartTimestamp;
    
    const positionWidth = 42;
    const columns = 17;
    const boardWidth = positionWidth * columns;

    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0.1,
      10000
  );

    useEffect(() => {
        scene.background = new THREE.Color('#141517');

        const vechicleColors = [0xa52523, 0xbdb638, 0x78b14b, 0x1a5b9c];
        chicken.position.z = -1
        
        const billboard = new Billboard(zoom, 'Redux', '#B845F2')
        billboard.position.x = 21 * zoom * 13
        billboard.position.y = 21 * zoom

        const billboard2 = new Billboard(zoom, 'React', '#02B8E1')
        billboard2.position.x = 21 * zoom * -13
        billboard2.position.y = 21 * zoom

        scene.add(chicken, billboard, billboard2);

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
        dirLight.angle = Math.PI / 4;
        dirLight.castShadow = true;
        scene.add(dirLight);

        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        var d = 300;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

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

        const text = new myReact('Hi, my name is {enter name}')
        text.position.z = 2
        text.position.x = (-boardWidth/2) * zoom + 100
        text.position.y = -200

        const text2 = new myReact('I am a frontend developer')
        text2.position.z = 2
        text2.position.x = (-boardWidth/2) * zoom + 400
        text2.position.y = -350

        const text3 = new myReact('Jump ahead to see my stack')
        text3.position.z = 2
        text3.position.x = (-boardWidth/2) * zoom + 100
        text3.position.y = -500

        scene.add(text, text2, text3)

        const initaliseValues = () => {
            lanes = generateLanes(zoom,boardWidth, positionWidth, scene, vechicleColors, height);
            currentLane = 0;
            currentColumn = Math.floor(columns / 2);

            previousTimestamp = null;

            startMoving = false;
            moves = [];

            chicken.position.x = 0;
            chicken.position.y = 0;

            camera.position.y = initialCameraPositionY;
            camera.position.x = initialCameraPositionX;

            dirLight.position.x = initialDirLightPositionX;
            dirLight.position.y = initialDirLightPositionY;
        };

        initaliseValues();


        const addLane = () => {
            const index = lanes.length;
            const lane = new Lane(index, zoom, boardWidth, positionWidth, vechicleColors, height);
            lane.mesh.position.y = index*positionWidth*zoom;
            scene.add(lane.mesh);
            lanes.push(lane);
          }

          function move(direction) {
            const finalPositions = moves.reduce((position,move) => {
              if(move === 'forward') return {lane: position.lane + 1, column: position.column};
              if(move === 'backward') return {lane: position.lane - 1, column: position.column};
              if(move === 'left') return {lane: position.lane, column: position.column - 1};
              if(move === 'right') return {lane: position.lane, column: position.column + 1};
            }, {lane: currentLane, column: currentColumn})

            if (direction === 'forward') {
              if(lanes[finalPositions.lane+1].type === 'forest' && lanes[finalPositions.lane+1].occupiedPositions.has(finalPositions.column)) return;
              if(!stepStartTimestamp) startMoving = true;
              addLane();
            }
            else if (direction === 'backward') {
              if(finalPositions.lane === 0) return;
              if(lanes[finalPositions.lane-1].type === 'forest' && lanes[finalPositions.lane-1].occupiedPositions.has(finalPositions.column)) return;
              if(!stepStartTimestamp) startMoving = true;
            }
            else if (direction === 'left') {
              if(finalPositions.column === 0) return;
              if(lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column-1)) return;
              if(!stepStartTimestamp) startMoving = true;
            }
            else if (direction === 'right') {
              if(finalPositions.column === columns - 1 ) return;
              if(lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column+1)) return;
              if(!stepStartTimestamp) startMoving = true;
            }
            moves.push(direction);
          }

          window.addEventListener("keydown", event => {
            if (event.keyCode == '38' && localIsDead === false) {
              // up arrow
              if (chicken.scale.z > 0.8) {
                  chicken.scale.z -= 0.2
              }
            }
            else if (event.keyCode == '40' && localIsDead === false) {
              // down arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
            else if (event.keyCode == '37' && localIsDead === false) {
              // left arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
            else if (event.keyCode == '39' && localIsDead === false) {
              // right arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
          });

          window.addEventListener("keyup", event => {
            if (event.keyCode == '38' && localIsDead === false) {
              chicken.scale.z = 1
              move('forward')
              cameraSpeed += 0.01;
              setScore(currentLane + 1)
            }
            else if (event.keyCode == '40' && localIsDead === false) {
              // down arrow
              chicken.scale.z = 1
              move('backward')
            }
            else if (event.keyCode == '37' && localIsDead === false) {
              // left arrow
              chicken.scale.z = 1
              move('left')
            }
            else if (event.keyCode == '39' && localIsDead === false) {
              // right arrow
              chicken.scale.z = 1
              move('right')
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

        function animate(timestamp) {
            requestAnimationFrame( animate );

            if(!previousTimestamp) previousTimestamp = timestamp;
            const delta = timestamp - previousTimestamp;
            previousTimestamp = timestamp;

            lanes.forEach(lane => {
              if (lane.type === 'car' || lane.type === 'truck') {
                const aBitBeforeTheBeginingOfLane = -boardWidth*zoom/2 - positionWidth*2*zoom;
                const aBitAfterTheEndOFLane = boardWidth*zoom/2 + positionWidth*2*zoom;
                lane.vechicles.forEach(vechicle => {
                  if(lane.direction) {
                    vechicle.position.x = vechicle.position.x < aBitBeforeTheBeginingOfLane ? aBitAfterTheEndOFLane : vechicle.position.x -= lane.speed/16*delta;
                  }else{
                    vechicle.position.x = vechicle.position.x > aBitAfterTheEndOFLane ? aBitBeforeTheBeginingOfLane : vechicle.position.x += lane.speed/16*delta;
                  }
                });
              }

              if (lane.type === 'river') {
                const aBitBeforeTheBeginingOfLane = -boardWidth*zoom/2 - positionWidth*2*zoom;
                const aBitAfterTheEndOFLane = boardWidth*zoom/2 + positionWidth*2*zoom;
                lane.rafts.forEach(raft => {
                  if(lane.direction) {
                    raft.position.x = raft.position.x < aBitBeforeTheBeginingOfLane ? aBitAfterTheEndOFLane : raft.position.x -= lane.speed/16*delta;
                  }else{
                    raft.position.x = raft.position.x > aBitAfterTheEndOFLane ? aBitBeforeTheBeginingOfLane : raft.position.x += lane.speed/16*delta;
                  }
                });
              }

              if (lane.type === 'railroad') {
                console.log()
                const aBitBeforeTheBeginingOfLane = -boardWidth*zoom/0.1 - positionWidth*2*zoom;
                const aBitAfterTheEndOFLane = boardWidth*zoom/0.1 + positionWidth*2*zoom;
                lane.trains.forEach(train => {
                  if(lane.direction) {
                    train.position.x = train.position.x < aBitBeforeTheBeginingOfLane ? aBitAfterTheEndOFLane : train.position.x -= lane.speed/0.7*delta;
                  }else{
                    train.position.x = train.position.x > aBitAfterTheEndOFLane ? aBitBeforeTheBeginingOfLane : train.position.x += lane.speed/0.7*delta;
                  }
                });
              }

            });

            if(startMoving) {
              stepStartTimestamp = timestamp;
              startMoving = false;
            }

            if(stepStartTimestamp) {
              const moveDeltaTime = timestamp - stepStartTimestamp;
              const moveDeltaDistance = Math.min(moveDeltaTime/stepTime,1)*positionWidth*zoom;
              const jumpDeltaDistance = Math.sin(Math.min(moveDeltaTime/stepTime,1)*Math.PI)*8*zoom;
              switch(moves[0]) {
                case 'forward': {
                  const positionY = currentLane*positionWidth*zoom + moveDeltaDistance;
                if (chicken.position.y - 600 > camera.position.y) {
                    camera.position.y = initialCameraPositionY + positionY;
                }
                  dirLight.position.y = initialDirLightPositionY + positionY;
                  chicken.position.y = positionY;

                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 0
                  break;
                }
                case 'backward': {
                  positionY = currentLane*positionWidth*zoom - moveDeltaDistance
                  dirLight.position.y = initialDirLightPositionY + positionY;
                  chicken.position.y = positionY;

                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 3.15
                  break;
                }
                case 'left': {
                  const positionX = (currentColumn*positionWidth+positionWidth/2)*zoom -boardWidth*zoom/2 - moveDeltaDistance;
                  // camera.position.x = initialCameraPositionX + positionX;
                  dirLight.position.x = initialDirLightPositionX + positionX;
                  chicken.position.x = positionX; // initial chicken position is 0
                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 1.6
                  break;
                }
                case 'right': {
                  const positionX = (currentColumn*positionWidth+positionWidth/2)*zoom -boardWidth*zoom/2 + moveDeltaDistance;
                  // camera.position.x = initialCameraPositionX + positionX;
                  dirLight.position.x = initialDirLightPositionX + positionX;
                  chicken.position.x = positionX;

                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 4.7

                  break;
                }
              }

              if(moveDeltaTime > stepTime) {
                switch(moves[0]) {
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
                stepStartTimestamp = moves.length === 0 ? null : timestamp;
              }
            }

            // Hit test
            if(lanes[currentLane].type === 'car' || lanes[currentLane].type === 'truck') {
              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
              const vechicleLength = { car: 60, truck: 105}[lanes[currentLane].type];
              lanes[currentLane].vechicles.forEach(vechicle => {
                const carMinX = vechicle.position.x - vechicleLength*zoom/2;
                const carMaxX = vechicle.position.x + vechicleLength*zoom/2;
                if (chickenMaxX > carMinX && chickenMinX < carMaxX) {
                    localIsDead = true;
                    setIsDead(true);
                    chicken.scale.z = 0.2;
                    cameraSpeed = 0;
                }
              });
            }

            if(lanes[currentLane].type === 'railroad') {
              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
              const vechicleLength = {railroad: (42*4*3) * zoom}[lanes[currentLane].type];
              lanes[currentLane].trains.forEach(train => {
                const carMinX = train.position.x - vechicleLength*zoom/2;
                const carMaxX = train.position.x + vechicleLength*zoom/2;
                if (chickenMaxX > carMinX && chickenMinX < carMaxX) {
                    localIsDead = true;
                    setIsDead(true);
                    chicken.scale.z = 0.2;
                    cameraSpeed = 0;
                }
              });
            }

            if(lanes[currentLane].type === 'river') {
              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
              
              lanes[currentLane].rafts.forEach(raft => {
                console.log(raft.geometry.parameters.width)

                const raftMinX = raft.position.x - raft.geometry.parameters.width/2;
                const raftMaxX = raft.position.x + raft.geometry.parameters.width/2;
                if(chickenMaxX > raftMinX && chickenMinX < raftMaxX) {
                    chicken.position.x = raft.position.x
                    currentColumn = 17 - Math.round(( 1428 - (672 + chicken.position.x))/84)
                    // camera.position.x = (chicken.position.x)
                    dirLight.position.x = (chicken.position.x - 100)
                    if (chicken.position.x > 672 || chicken.position.x < -672) {
                      localIsDead = true;
                      setIsDead(true);
                      chicken.scale.x = 0.2;
                    }
                }
                // Нужно найти истину
                if(chickenMaxX < raftMinX || chickenMinX > raftMaxX) {
                    localIsDead = true;
                    setIsDead(true);
                    chicken.position.z = -45;
                }
              });
            }
            renderer.render( scene, camera );
          }

          let timer = setInterval(() => {
            if (currentLane > 0) {
                camera.position.y += cameraSpeed;
            }
        }, 15);

        if (chicken.position.y - 600 > camera.position.y) {
            clearInterval(timer);
        }

        if (restart) {
          lanes.forEach(lane => scene.remove( lane.mesh ));
          scene.clear()
          window.location.reload()
        }
      
        requestAnimationFrame( animate );

        renderer.render(scene, camera);
    }, [restart]);

    return (
        <>
            <div className={style.game} ref={mountRef} />
            <div className={style.scoreBox}>
              <Score score={score}/>
            </div>
            {isDead === true && restart === false ? (
                <div className={style.end}>
                    <Restart restart={restart} setRestart={setRestart}/>
                </div>
            ) : null}
        </>
    );
}
