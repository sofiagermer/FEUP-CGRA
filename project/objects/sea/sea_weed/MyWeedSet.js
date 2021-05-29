//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../../../lib/CGF.js';
import { MySeaWeed } from './MySeaWeed.js';


export class MyWeedSet extends CGFobject {
    constructor(scene, num_sea_weeds, offset, size) {
        super(scene);

        this.seaWeeds = [];
        const SLICES = 3;
        const STACKS = 6;
        
        for (let n = 0; n < num_sea_weeds; ++n) {
            let seaWeed = new MySeaWeed(this.scene, SLICES, STACKS, offset, size, 12.5);
            this.seaWeeds.push(seaWeed);
        }
    }   

    display() {        
        this.scene.setActiveShaderSimple(this.scene.seaWeedShader);
        this.seaWeeds.forEach(seaWeed => { seaWeed.display(); });
        this.scene.setActiveShaderSimple(this.scene.defaultShader);
    }
}
