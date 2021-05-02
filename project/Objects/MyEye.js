import {CGFobject,CGFappearance, CGFscene } from '../../lib/CGF.js';
import { MySphere} from "./MySphere.js";

/**
* MyFin
* @constructor
*/
export class MyEye extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 16, 16);
        this.initMaterials();
    }

    initMaterials() {
        this.scene.materialBlack = new CGFappearance(this.scene);
        this.scene.materialBlack.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.materialBlack.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialBlack.setSpecular(1.0,1.0,1.0,1.0);
        this.scene.materialBlack.setEmission(0.0, 0.0, 0.0, 1.0);
        this.scene.materialBlack.setShininess(10.0);  

        this.scene.materialWhite = new CGFappearance(this.scene);
        this.scene.materialWhite.setAmbient(2.55, 2.55, 2.55, 1.0);
        this.scene.materialWhite.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialWhite.setSpecular(1.0,1.0,1.0,1.0);
        this.scene.materialWhite.setEmission(0.0, 0.0, 0.0, 1.0);
        this.scene.materialWhite.setShininess(10.0);  
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(0,0,0);
        this.scene.materialWhite.apply();
        this.sphere.display(); 
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.25,0.25,0.25);
        this.scene.translate(1.5,0,0);
        this.scene.materialBlack.apply();
        this.sphere.display(); 
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.sphere.enableNormalViz();
    }

    disableNormalViz(){
        this.sphere.disableNormalViz();
    }
}