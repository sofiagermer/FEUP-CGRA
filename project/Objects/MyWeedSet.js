//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { MySeaWeed } from './MySeaWeed.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyWeedSet extends CGFobject {
    constructor(scene, no_weeds) {
        super(scene);
        this.weedSet=[];
        this.no_weeds = no_weeds;
        for(var i=0;i<no_weeds;i++){
            var transX = Math.random()*50-20;
            var transZ = Math.random()*50-20;
            var scale = Math.random()*0.2;
            var rot = Math.random();
            this.seaWeed = new MySeaWeed(scene, scale, transX, transZ, rot);
            this.weedSet.push(this.seaWeed);
        }
    }   
}


