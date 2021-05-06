//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyRockSet extends CGFobject {
    constructor(scene, no_rocks) {
        super(scene);
        this.rockSet=[];
        this.no_rocks = no_rocks;
        for(var i=0;i<no_rocks;i++){
            var transX = Math.random()*10;
            var transZ = Math.random()*10;
            var scale = Math.random()*0.2;
            var rot = Math.random();
            this.rock = new MyRock(scene, 10, 10, scale, transX, transZ, rot);
            this.rockSet.push(this.rock);
        }
        this.initMaterials();
    }

    initMaterials() {
        this.scene.materialRock = new CGFappearance(this.scene);
        this.scene.materialRock.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.materialRock.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialRock.setSpecular(1.0,1.0,1.0,1.0);
        this.scene.materialRock.setEmission(0.3, 0.3, 0.3, 1.0);
        this.scene.materialRock.setShininess(10.0);  
    }   
}


