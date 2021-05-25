//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../lib/CGF.js';
import {MySphere} from '../Objects/MySphere.js';
import {MyFin} from '../Objects/MyFin.js';
import {MyTail} from '../Objects/MyTail.js';
import {MyEye} from '../Objects/MyEye.js';

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
        this.scene.fishShader = new CGFshader(this.scene.gl, "shaders/fish.vert", "shaders/fish.frag");
    }

    update(){
        this.fin.angle =  Math.sin(0.4* this.scene.t) * 0.2;
        //this.tail.angle = Math.sin(this.scene.t * (this.scene.fishSpeed + 0.4) / 300 % 300);
        //this.tail.angle =  Math.sin(0.4* (this.scene.t/ 300 % 300));
        //this.tail.angle = Math.sin(this.scene.t * (this.scene.fishSpeed + 0.4) / 300 % 300);
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
        this.scene.scale(0.4,0.4,0.4);
        this.scene.translate(1.63, 0.5, 0.0);
        this.scene.rotate( Math.sin(this.scene.t * (this.scene.fishSpeed + 0.4) / 100 % 100) * 0.4,0,1,0);
        this.scene.materialRed.apply();
        this.tail.display(); 
        this.scene.popMatrix();

        //RIGHT FIN
        this.scene.pushMatrix();
        this.scene.translate(1.4,-0.2,-0.51);
        this.scene.rotate(-this.fin.angle,1,0,0);
        this.scene.translate(-1,-0,0);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.materialRed.apply();
        this.fin.display(); 
        this.scene.popMatrix(); 

        //LEFT FIN
        this.scene.pushMatrix();
        this.scene.translate(1.4,-0.2,0.51);
        this.scene.rotate(this.fin.angle,1,0,0);
        this.scene.translate(-1,-0,0);
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
    }

    enableNormalViz(){
        this.fishBody.enableNormalViz();
        this.fin.enableNormalViz();
        this.tail.enableNormalViz();
        this.eye.enableNormalViz();
    }
    
    disableNormalViz(){
        this.fishBody.disableNormalViz();
        this.fin.disableNormalViz();
        this.tail.disableNormalViz();
        this.eye.disableNormalViz();
    }
 
   
}


