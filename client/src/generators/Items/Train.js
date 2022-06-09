import * as THREE from 'three'
import Wheel from './Wheel';

export default function Train(zoom) {
    const train = new THREE.Group({ name: 'Train' });
    train.name = 'Train';

    function getVagon () {
        const vagon = new THREE.Group({ name: 'Vagon' });

        const main = new THREE.Mesh(
            new THREE.BoxBufferGeometry(42*4*zoom, 30 * zoom, 35 * zoom),
            new THREE.MeshPhongMaterial({ color: 0x3a86ff, flatShading: true })
        );
        main.position.z = 70;
        vagon.add(main);
    
        const platform = new THREE.Mesh(
            new THREE.BoxBufferGeometry(42*4*zoom + 3, 33 * zoom, 5 * zoom),
            new THREE.MeshPhongMaterial({ color: 0xd3d3d3, flatShading: true })
        );
        platform.position.z = 30;
        vagon.add(platform);
    
        for (let i = 0; i < 8; i++) {
            const sideWindow = new THREE.Mesh(
                new THREE.BoxBufferGeometry(10 * zoom, 33 * zoom, 10 * zoom),
                new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
            ); 
            sideWindow.position.z = 40 * zoom;
            sideWindow.position.x = (-140 + (i*20) * zoom);
            vagon.add(sideWindow);
        }
    
        const mainWindow = new THREE.Mesh(
            new THREE.BoxBufferGeometry(42*4*zoom + 3, 22 * zoom, 14 * zoom),
            new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true })
        ); 
        mainWindow.position.z = 40*zoom
        vagon.add(mainWindow)
    
        const flashLightL = new THREE.Mesh(
            new THREE.BoxBufferGeometry(42*4*zoom + 3, 4 * zoom, 4 * zoom),
            new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
        ); 
        flashLightL.position.z = 25*zoom
        flashLightL.position.y = -10*zoom
        vagon.add(flashLightL)
    
        const flashLightR = new THREE.Mesh(
            new THREE.BoxBufferGeometry(42*4*zoom + 3, 4 * zoom, 4 * zoom),
            new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
        ); 
        flashLightR.position.z = 25*zoom
        flashLightR.position.y = 10*zoom
        vagon.add(flashLightR)
    
        const roof1 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(40*4*zoom + 3, 20 * zoom, 5 * zoom),
            new THREE.MeshPhongMaterial({ color: 0xd3d3d3, flatShading: true })
        );
        roof1.position.z = 51*zoom
        vagon.add(roof1)
    
        const roof2 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(40*zoom + 3, 20 * zoom, 5 * zoom),
            new THREE.MeshPhongMaterial({ color: 0xd3d3d3, flatShading: true })
        );
        roof2.position.x = -50*zoom
        roof2.position.z = 53*zoom
    
        vagon.add(roof2)
    
        const roof3 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(40*zoom + 3, 20 * zoom, 5 * zoom),
            new THREE.MeshPhongMaterial({ color: 0xd3d3d3, flatShading: true })
        );
        roof3.position.x = 50*zoom
        roof3.position.z = 53*zoom
    
        vagon.add(roof3)
    
        const fWheel1 = new Wheel(zoom);
        fWheel1.position.z = 10;
        fWheel1.position.x = 140;
        fWheel1.scale.y = 0.8;
        const fWheel2 = new Wheel(zoom);
        fWheel2.position.z = 10;
        fWheel2.position.x = 100;
        fWheel2.scale.y = 0.8;
        vagon.add(fWheel1, fWheel2);
    
        const rWheel1 = new Wheel(zoom);
        rWheel1.position.z = 10;
        rWheel1.position.x = -140;
        rWheel1.scale.y = 0.8;
        const rWheel2 = new Wheel(zoom);
        rWheel2.position.z = 10;
        rWheel2.position.x = -100;
        rWheel2.scale.y = 0.8;
        vagon.add(rWheel1, rWheel2);   

        return vagon
    }

    const vagon1 = new getVagon()
    const vagon2 = new getVagon()
    vagon2.position.x = 43*4*zoom
    const vagon3 = new getVagon()
    vagon3.position.x = (43*4*zoom)*2

    train.add(vagon1, vagon2, vagon3)

    return train;
}


