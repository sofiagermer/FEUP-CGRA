//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../../../lib/CGF.js';
import { MyAnimatedFish } from './MyAnimatedFish.js';
import { MyFish } from './MyFish.js';

/**
* MyFish
* @constructor
* @param scene - Reference to MyScene object
*/
export class MyAnimatedFishSet extends CGFobject {
    constructor(scene, num_fishes) {
        super(scene);

        this.animatedFish = [];
        
        for (let n = 0; n < num_fishes; ++n) {
            let animated_fish =  new MyAnimatedFish(this.scene, Math.random() * 50 - 25 , Math.random()*4+1, Math.random() * 50 - 25);
            this.animatedFish.push(animated_fish);
        }
    }   

    display() {        
        this.animatedFish.forEach(animated_fish => { animated_fish.display(); });
    }

    update(t){
        this.animatedFish.forEach(animated_fish => { animated_fish.update(t); });
    }
}
