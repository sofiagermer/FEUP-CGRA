//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../../lib/CGF.js';
import {MySphere} from '../BasicShapes/MySphere.js';
import {MyFin} from './MyFin.js';
import {MyTail} from './MyTail.js';
import {MyEye} from './MyEye.js';
import { MyPlane } from '../BasicShapes/MyPlane.js';
import { MySeaFloor } from './MySeaFloor.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.fishBody = new MySphere(this.scene, 16, 8);
        this.tail = new MyTail(scene);
        this.fin = new MyFin(scene);
        this.eye = new MyEye(scene);
        //this.sand = new MySeaFloor(scene);
        this.initShaders();
        this.initMaterials();
    }

    initMaterials() {
        this.scene.materialRed = new CGFappearance(this.scene);
        this.scene.materialRed.setAmbient(1.0, 0.0, 0.0, 0.0);
        this.scene.materialRed.setDiffuse(1.0, 0.0, 0.0, 0.0);
        this.scene.materialRed.setSpecular(1.0,1.0,1.0,1.0);
        this.scene.materialRed.setEmission(0.0, 0.0, 0.0, 1.0);
        this.scene.materialRed.setShininess(10.0);  

        this.scene.materialFish = new CGFappearance(this.scene);
        this.scene.materialFish.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.materialFish.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialFish.setEmission(1.0, 1.0, 1.0, 1.0);
        this.scene.materialFish.setShininess(10.0);
        this.scene.materialFish.loadTexture('images/fish/fishBody.png'); 
    }

    initShaders(){
       
    }

    update(t){
        this.tail.angle = Math.sin(t) * Math.PI/8;
        this.fin.angle =  Math.sin(0.4* t) * 0.2;
    }

    display(){
        //BODY
        this.scene.pushMatrix();
        this.scene.scale(0.8,0.6,0.5);
        this.scene.materialFish.apply();
        this.scene.setActiveShader(this.scene.fishShader);
        this.fishBody.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
        
        //TAIL
        this.scene.pushMatrix();
        this.scene.translate(0.75,0,0);
        this.scene.rotate(this.tail.angle,0,1,0);
        this.scene.scale(0.4,0.4,0.4);
        this.scene.materialRed.apply();
        this.tail.display(); 
        this.scene.popMatrix();

        //RIGHT FIN
        this.scene.pushMatrix();
        this.scene.translate(0.4,-0.2,-0.5);
        this.scene.rotate(-this.fin.angle,1,0,0);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.materialRed.apply();
        this.fin.display(); 
        this.scene.popMatrix(); 

        //LEFT FIN
        this.scene.pushMatrix();
        this.scene.translate(0.4,-0.2,0.5);
        this.scene.rotate(this.fin.angle,1,0,0);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.materialRed.apply();
        this.fin.display(); 
        this.scene.popMatrix(); 

        //TOP FIN
        this.scene.pushMatrix();
        this.scene.translate(-0.2,0.6,0);
        this.scene.rotate(-Math.PI,0,1,0);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.materialRed.apply();
        this.fin.display(); 
        this.scene.popMatrix(); 

        //Right Eye
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0.35);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.scale(0.25,0.25,0.25);
        this.eye.display(); 
        this.scene.popMatrix();
        
        //Left Eye
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,-0.35);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.25,0.25,0.25);
        this.eye.display(); 
        this.scene.popMatrix();

        //Sand
        //this.sand.display();
    }

    enableNormalViz(){
        this.fishBody.enableNormalViz();
        this.fin.enableNormalViz();
        this.tail.enableNormalViz();
        this.eye.enableNormalViz();
        this.sand.enableNormalViz();
    }
    
    disableNormalViz(){
        this.fishBody.disableNormalViz();
        this.fin.disableNormalViz();
        this.tail.disableNormalViz();
        this.eye.disableNormalViz();
        this.sand.disableNormalViz();
    }
 
   
}


