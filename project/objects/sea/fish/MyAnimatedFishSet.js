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
            let headRatio = (Math.random() * 0.01) + 0.01;
            let headColor = [Math.random() * 0.1, Math.random() * 0.1, Math.random() * 0.1];

            let animated_fish =  new MyAnimatedFish(this.scene, headRatio, headColor);
            this.animatedFish.push(animated_fish);
        }
    }   

    display() {        
        this.animatedFish.forEach(animated_fish => { animated_fish.display(); });
    }

    update(){
        this.animatedFish.forEach(animated_fish => { animated_fish.update(); });
    }
}
