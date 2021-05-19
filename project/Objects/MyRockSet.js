//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyRockSet extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);
        this.rockSet=[];
        this.numRocks = numRocks;
        for(var i=0; i< numRocks; i++){
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

    rockNearby(coordinates){
        for(var i=0; i< this.numRocks; i++){
            if(Math.sqrt(Math.pow(this.rockSet[i].transX - coordinates[0], 2) + Math.pow(this.rockSet[i].transZ - coordinates[2],2)) < 1.5){
                return this.rockSet[i];
            }
        }
    }

    display(){
        for (var i = 0; i < 5; i++){
            this.scene.pushMatrix();    
            this.scene.translate(this.rockSet[i].transX,this.rockSet[i].transY, this.rockSet[i].transZ);
            this.scene.rotate(Math.PI/2,0,1,0);
            this.scene.scale( this.rockSet[i].scale,  this.rockSet[i].scale,  this.rockSet[i].scale); 
            this.scene.materialRock.apply();
            this.rockSet[i].display();
            this.scene.popMatrix();
        }
    }
}


