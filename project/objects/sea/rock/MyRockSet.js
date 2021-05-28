//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../../../../lib/CGF.js';
import{MyRock} from './MyRock.js';

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
            var scaleX = (Math.floor(Math.random() * 10) + 11) / 70;
            var scaleY = (Math.floor(Math.random() * 10) + 11) / 70;
            var scaleZ = (Math.floor(Math.random() * 10) + 11) / 70;
            var rot = Math.random();
            this.rock = new MyRock(scene, 10, 10, scaleX, scaleY, scaleZ, transX, transZ, rot);
            this.rockSet.push(this.rock);
        }
        this.initMaterials();
    }

    initMaterials() {
        this.scene.materialRock = new CGFappearance(this.scene);
        this.scene.materialRock.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.scene.materialRock.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.scene.materialRock.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.scene.materialRock.setEmission(0, 0, 0, 1);
        this.scene.materialRock.setShininess(120);
        this.scene.materialRock.loadTexture("images/rock.png");
        this.scene.materialRock.setTextureWrap("REPEAT", "REPEAT");
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
            this.scene.scale( this.rockSet[i].scaleX,  this.rockSet[i].scaleY,  this.rockSet[i].scaleZ); 
            this.scene.materialRock.apply();
            this.rockSet[i].display();
            this.scene.popMatrix();
        }
    }
}


