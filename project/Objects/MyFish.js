//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene } from '../../lib/CGF.js';
import {MyFishBody} from '../Objects/MyFishBody.js';
import {MyFin} from '../Objects/MyFin.js';
import {MyEye} from '../Objects/MyEye.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.fishBody = new MyFishBody(scene);

        this.lateralFinRight = new MyFin(scene);
        this.lateralFinLeft = new MyFin(scene);
        this.dorsalFin = new MyFin(scene);
        this.tail = new MyFin(scene);

        this.rightEye = new MyEye(scene);
        this.leftEye = new MyEye(scene);

        this.initMaterials();
    }

    initMaterials() {
        
    }

    display(){
        //body
        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5);
        this.fishBody.display();
        this.scene.popMatrix();  
        
        //righ fin
        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5);
        this.scene.translate(-0.5,-0.3,0.6);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(Math.PI+Math.PI/4,1,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        //this.scene.rotate(Math.PI/3,0,0,1);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.red.apply();
        this.lateralFinRight.display(); 
        this.scene.popMatrix(); 


        //left fin
        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5);
        this.scene.translate(0.5,-0.3,0.6);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(Math.PI+Math.PI/4,1,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.red.apply();
        this.lateralFinRight.display(); 
        this.scene.popMatrix(); 


        //dorsal fin
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(0,3,0);
        this.scene.rotate(5*Math.PI/4,1,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.red.apply();
        this.dorsalFin.display(); 
        this.scene.popMatrix();


        //tail
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(0,0,-5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.red.apply();
        this.tail.display(); 
        this.scene.popMatrix(); 

        //right eye
        this.scene.pushMatrix();
        this.scene.scale(0.25,0.25,0.25);
        this.scene.translate(2.7,2.5,4);
        this.rightEye.display(); 
        this.scene.popMatrix();
        

        //left eye
        this.scene.pushMatrix();
        this.scene.scale(0.25,0.25,0.25);
        this.scene.translate(-2.7,2.5,4);
        this.scene.rotate(Math.PI,0,0,1);
        this.leftEye.display(); 
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.fishBody.enableNormalViz();
        this.lateralFinRight.enableNormalViz();
        this.lateralFinLeft.enableNormalViz();
        this.tail.enableNormalViz();
        this.dorsalFin.enableNormalViz();
        this.rightEye.enableNormalViz();
        this.leftEye.enableNormalViz();
    }
    
    disableNormalViz(){
        this.fishBody.disableNormalViz();
        this.lateralFinRight.disableNormalViz();
        this.lateralFinLeft.disableNormalViz();
        this.dorsalFin.disableNormalViz();
        this.tail.disableNormalViz();
        this.rightEye.disableNormalViz();
        this.leftEye.disableNormalViz();
    }
 
   
}


