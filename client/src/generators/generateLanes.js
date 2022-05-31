import Lane from './Lane';

const generateLanes = (
    zoom,
    boardWidth,
    positionWidth,
    scene,
    vechicleColors,
    height
) =>
    [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map((index) => {
            const lane = new Lane(
                index,
                zoom,
                boardWidth,
                positionWidth,
                vechicleColors,
                height
            );
            lane.mesh.position.y = index * positionWidth * zoom;
            scene.add(lane.mesh);
            return lane;
        })
        .filter((lane) => lane.index >= 0);

export default generateLanes;
