import Grass from './Ground/Grass';
import Road from './Ground/Road';
import Water from './Ground/Water';
import Car from './Items/Car';
import Tree from './Items/Tree';
import Truck from './Items/Truck';
import Raft from './Items/Raft'
import Pad from './Items/Pad';
import Rails from './Ground/Rails';

const laneTypes = ['railroad', 'car', 'truck', 'forest', 'river', 'waterpads'];
const laneSpeeds = [2, 2.5, 3];

export default function Lane(index, zoom, boardWidth, positionWidth, vechicleColors, height) {
    this.index = index;
    this.type =
        index <= 0
            ? 'field'
            : laneTypes[Math.floor(Math.random() * laneTypes.length)];

    // eslint-disable-next-line default-case
    switch (this.type) {
        case 'field': {
            this.type = 'field';
            this.mesh = new Grass(zoom, boardWidth, positionWidth);
            break;
        }
        case 'railroad': {
            this.type = 'field';
            this.mesh = new Rails(zoom, boardWidth, positionWidth);
            break;
        }
        case 'forest': {
            this.mesh = new Grass(zoom, boardWidth, positionWidth);

            this.occupiedPositions = new Set();
            this.trees = [1, 2, 3, 4].map(() => {
                const tree = new Tree(zoom, height);
                let position;
                do {
                    position = Math.floor(Math.random() * boardWidth/positionWidth);
                } while (this.occupiedPositions.has(position));
                this.occupiedPositions.add(position);
                tree.position.x =
                    (position * positionWidth + positionWidth / 2) * zoom -
                    (boardWidth * zoom) / 2;
                this.mesh.add(tree);
                return tree;
            });
            break;
        }
        case 'car': {
            this.mesh = new Road(zoom, boardWidth, positionWidth);
            this.direction = Math.random() >= 0.5;

            const occupiedPositions = new Set();
            this.vechicles = [1, 2, 3].map(() => {
                const vechicle = new Car(vechicleColors, zoom);
                let position;
                do {
                    position = Math.floor((Math.random() * boardWidth/positionWidth) / 2);
                } while (occupiedPositions.has(position));
                occupiedPositions.add(position);
                vechicle.position.x =
                    (position * positionWidth * 2 + positionWidth / 2) * zoom -
                    (boardWidth * zoom) / 2;
                if (!this.direction) vechicle.rotation.z = Math.PI;
                this.mesh.add(vechicle);
                return vechicle;
            });

            this.speed =
                laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
            break;
        }
        case 'truck': {
            this.mesh = new Road(zoom, boardWidth, positionWidth);
            this.direction = Math.random() >= 0.5;

            const occupiedPositions = new Set();
            this.vechicles = [1, 2].map(() => {
                const vechicle = new Truck(zoom, vechicleColors);
                let position;
                do {
                    position = Math.floor((Math.random() * boardWidth/positionWidth) / 3);
                } while (occupiedPositions.has(position));
                occupiedPositions.add(position);
                vechicle.position.x =
                    (position * positionWidth * 3 + positionWidth / 2) * zoom -
                    (boardWidth * zoom) / 2;
                if (!this.direction) vechicle.rotation.z = Math.PI;
                this.mesh.add(vechicle);
                return vechicle;
            });

            this.speed =
                laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
            break;
        }
        case 'river': {
            this.mesh = new Water(zoom, boardWidth, positionWidth);
            this.direction = Math.random() >= 0.5;

            const occupiedPositions = new Set();
            this.rafts = [1, 2, 3].map(() => {
                const raft = new Raft(zoom, positionWidth);
                let position;
                do {
                    position = Math.floor((Math.random() * boardWidth/positionWidth) / 3);
                } while (occupiedPositions.has(position));
                occupiedPositions.add(position);
                raft.position.x =
                    (position * positionWidth * 3 + positionWidth / 2) * zoom -
                    (boardWidth * zoom) / 2;
                if (!this.direction) raft.rotation.z = Math.PI;
                this.mesh.add(raft);
                return raft;
            });

            this.speed =
                laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
            break;
        }
        case 'waterpads': {
            this.mesh = new Water(zoom, boardWidth, positionWidth);

            this.occupiedPositions = new Set();
            this.pads = [1, 2, 3, 4, 5].map(() => {
                const pad = new Pad(zoom, positionWidth)
                let position;
                do {
                    position = Math.floor(Math.random() * boardWidth/positionWidth);
                } while (this.occupiedPositions.has(position));
                this.occupiedPositions.add(position);
                pad.position.x =
                    (position * positionWidth + positionWidth / 2) * zoom -
                    (boardWidth * zoom) / 2;
                this.mesh.add(pad);
                return pad;
            });
            break;
        }
    }
}