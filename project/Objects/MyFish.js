//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../lib/CGF.js';
import {MySphere} from '../Objects/MySphere.js';
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
        this.fishBody = new MySphere(this.scene, 16, 8);
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

    changeFiltering() {
        if (this.enableLinearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }

    display(){
        //BODY
        this.scene.pushMatrix();
        this.changeFiltering();
        this.scene.scale(0.8,0.6,0.5);
        this.scene.materialFish.apply();
        this.scene.setActiveShader(this.scene.fishShader);
        this.fishBody.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
        
        //TAIL
        this.scene.pushMatrix();
        this.scene.translate(1.3,0,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.scale(0.4,0.4,0.4);
        this.scene.materialRed.apply();
        this.fin.display(); 
        this.scene.popMatrix();

        //RIGHT FIN
        this.scene.pushMatrix();
        this.scene.translate(0.2,-0.2,-0.5);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.materialRed.apply();
        this.fin.display(); 
        this.scene.popMatrix(); 

        //LEFT FIN
        this.scene.pushMatrix();
        this.scene.translate(0.2,-0.2,0.5);
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


