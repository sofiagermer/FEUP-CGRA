//o peixe deverá ser criado a partir de um corpo, desenvolvido através de uma esfera distorcida, c shader bipartido
import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../../../lib/CGF.js';
import {MySphere} from '../../basic_shapes/MySphere.js';
import {MyFin} from './MyFin.js';
import {MyTail} from './MyTail.js';
import {MyEye} from './MyEye.js';

/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyFish extends CGFobject {
    constructor(scene, ratio, color) {
        super(scene);
        this.ratio = ratio;
        this.initFish(scene);
        this.color = color | [0.0, 0.0, 0.1];
        this.initShaders();

        this.initMaterials();
    }

    initFish(scene){
        this.fishBody = new MySphere(this.scene, 16, 8);
        this.tail = new MyTail(scene);
        this.topFin = new MyFin(scene);
        this.leftFin = new MyFin(scene);
        this.rightFin = new MyFin(scene);
        this.eye = new MyEye(scene);
    }

    initShaders(){
        this.fishShader = new CGFshader(this.scene.gl, "shaders/fish.vert", "shaders/fish.frag");
        //this.fishShader.setUniformsValues({ ratio: this.ratio, headColor: this.color});
        /*this.fishShader.shader.setUniformsValues({
            r: this.colors[0],
            g: this.colors[1],
            b: this.colors[2],
          });*/
        this.fishShader.setUniformsValues({ r: 1, g: 0.5, b: 0 });
    }

    initMaterials() {
        this.materialSkin = new CGFappearance(this.scene);
        this.materialSkin.setAmbient(0.0, 0.0, 0.5, 0.0);
        this.materialSkin.setDiffuse(this.color[0], this.color[1], this.color[2], 1.0);
        this.materialSkin.setSpecular(1.0,1.0,1.0,1.0);
        this.materialSkin.setEmission(0.3, 0.3, 0.3, 1.0);
        this.materialSkin.setShininess(10.0);  

        this.scene.materialFish = new CGFappearance(this.scene);
        this.scene.materialFish.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.materialFish.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialFish.setEmission(1.0, 1.0, 1.0, 1.0);
        this.scene.materialFish.setShininess(10.0);
        this.scene.materialFish.loadTexture('images/fish/fishBody.png'); 
    }

    update(turningRight, turningLeft,speed){
        this.updateTail(speed);
        this.updateFins(turningRight, turningLeft);
    }

    updateTail(speed){
        if(speed < 0.1){
            this.tail.angle = Math.sin(this.scene.t * (speed + 0.4) / 100 % 100);
        }
        else{
            this.tail.angle = Math.sin(this.scene.t * (speed * 4.0) / 100 % 100);
        }
    }

    updateFins(turningRight, turningLeft){
        if(!turningLeft && ! turningRight){
            this.leftFin.angle =  Math.sin(0.4* this.scene.t) * 0.2;
            this.rightFin.angle =  Math.sin(0.4* this.scene.t) * 0.2;
        }
        else if(turningRight){
            this.leftFin.angle =  Math.sin(0.4* this.scene.t) * 0.2;
            this.rightFin.angle =  0;
        }
        else if(turningLeft){
            this.leftFin.angle =  0;
            this.rightFin.angle =  Math.sin(0.4* this.scene.t) * 0.2;
        }
    }

    setShaderColors(headColor){
        this.fishShader.setUniformsValues({ r: headColor[0], g: headColor[1], b: headColor[2]});
    }

    setMaterialColor(headColor){
        this.materialSkin = new CGFappearance(this.scene);
        this.materialSkin.setAmbient(0.0, 0.0, 0.5, 0.0);
        this.materialSkin.setDiffuse(headColor[0], headColor[1], headColor[2], 0.6);
        this.materialSkin.setSpecular(1.0,1.0,1.0,1.0);
        this.materialSkin.setEmission(0.3, 0.3, 0.3, 1.0);
        this.materialSkin.setShininess(10.0);
    }

    display(){
        //BODY
        this.scene.pushMatrix();
        this.scene.scale(0.8,0.6,0.5);
        this.scene.materialFish.apply();
        this.scene.setActiveShader(this .fishShader);
        this.fishBody.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
        
        //TAIL
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.4);
        this.scene.translate(1.63, 0.5, 0.0);
        this.scene.rotate(this.tail.angle,0,1,0);
        this.materialSkin.apply();
        this.tail.display(); 
        this.scene.popMatrix();

        //RIGHT FIN
        this.scene.pushMatrix();
        this.scene.translate(1.4,-0.2,-0.51);
        this.scene.rotate(-this.rightFin.angle,1,0,0);
        this.scene.translate(-1,-0,0);
        this.scene.scale(0.2,0.2,0.2);
        this.materialSkin.apply();
        this.rightFin.display(); 
        this.scene.popMatrix(); 

        //LEFT FIN
        this.scene.pushMatrix();
        this.scene.translate(1.4,-0.2,0.51);
        this.scene.rotate(this.leftFin.angle,1,0,0);
        this.scene.translate(-1,-0,0);
        this.scene.scale(0.2,0.2,0.2);
        this.materialSkin.apply();
        this.leftFin.display(); 
        this.scene.popMatrix(); 

        //TOP FIN
        this.scene.pushMatrix();
        this.scene.translate(-0.2,0.6,0);
        this.scene.rotate(-Math.PI,0,1,0);
        this.scene.scale(0.3,0.3,0.3);
        this.materialSkin.apply();
        this.topFin.display(); 
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
        this.rightFin.enableNormalViz();
        this.leftFin.enableNormalViz();
        this.topFin.enableNormalViz();
        this.tail.enableNormalViz();
        this.eye.enableNormalViz();
    }
    
    disableNormalViz(){
        this.fishBody.disableNormalViz();
        this.rightFin.disableNormalViz();
        this.leftFin.disableNormalViz();
        this.topFin.disableNormalViz();
        this.tail.disableNormalViz();
        this.eye.disableNormalViz();
    }
}