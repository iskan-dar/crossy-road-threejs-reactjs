import Lane from './Lane';

const generateLanes = (
    zoom,
    boardWidth,
    positionWidth,
    scene,
    vechicleColors,
    height
) =>
    [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
        .map((index) => {
            let lane = new Lane(
                index,
                zoom,
                boardWidth,
                positionWidth,
                vechicleColors,
                height
            );
            while(lane.type === 'waterpads' || lane.type === 'river'){
                lane = new Lane(
                    index,
                    zoom,
                    boardWidth,
                    positionWidth,
                    vechicleColors,
                    height
                )
            };

            lane.mesh.position.y = index * positionWidth * zoom;
            scene.add(lane.mesh);
            return lane;
        })
        .filter((lane) => lane.index >= 0);

export default generateLanes;
