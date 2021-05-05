//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyRockSet extends CGFobject {
    constructor(scene) {
        super(scene);
        this.rockSet=[];
        this.scene = scene;
        for(var i=0;i<5;i++){
            this.rock = new MyRock(this.scene, 10,10);
            this.rockSet.push(this.rock);
        }
    }

    update(t){
        this.tail.angle = Math.sin(t) * Math.PI/8;
        this.fin.angle =  Math.sin(0.4* t) * 0.2;
    }

    enableNormalViz(){
        this.rockSet.enableNormalViz();
    }
    
    disableNormalViz(){
        this.rockSet.disableNormalViz();   
    }
 
   
}


