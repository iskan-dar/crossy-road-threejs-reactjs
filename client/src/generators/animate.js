

export default function animate(timestamp) {
    requestAnimationFrame( animate );
  
    if(!previousTimestamp) previousTimestamp = timestamp;
    const delta = timestamp - previousTimestamp;
    previousTimestamp = timestamp;
  
    // Animate cars and trucks moving on the lane
    lanes.forEach(lane => {
      if(lane.type === 'car' || lane.type === 'truck') {
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
          camera.position.y = initialCameraPositionY + positionY; 
          dirLight.position.y = initialDirLightPositionY + positionY; 
          chicken.position.y = positionY; // initial chicken position is 0
  
          chicken.position.z = jumpDeltaDistance;
          break;
        }
        case 'backward': {
          positionY = currentLane*positionWidth*zoom - moveDeltaDistance
          camera.position.y = initialCameraPositionY + positionY;
          dirLight.position.y = initialDirLightPositionY + positionY; 
          chicken.position.y = positionY;
  
          chicken.position.z = jumpDeltaDistance;
          break;
        }
        case 'left': {
          const positionX = (currentColumn*positionWidth+positionWidth/2)*zoom -boardWidth*zoom/2 - moveDeltaDistance;
          camera.position.x = initialCameraPositionX + positionX;     
          dirLight.position.x = initialDirLightPositionX + positionX; 
          chicken.position.x = positionX; // initial chicken position is 0
          chicken.position.z = jumpDeltaDistance;
          break;
        }
        case 'right': {
          const positionX = (currentColumn*positionWidth+positionWidth/2)*zoom -boardWidth*zoom/2 + moveDeltaDistance;
          camera.position.x = initialCameraPositionX + positionX;       
          dirLight.position.x = initialDirLightPositionX + positionX;
          chicken.position.x = positionX; 
  
          chicken.position.z = jumpDeltaDistance;
          break;
        }
      }
      // Once a step has ended
      if(moveDeltaTime > stepTime) {
        switch(moves[0]) {
          case 'forward': {
            currentLane++;
            counterDOM.innerHTML = currentLane;    
            break;
          }
          case 'backward': {
            currentLane--;
            counterDOM.innerHTML = currentLane;    
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
}