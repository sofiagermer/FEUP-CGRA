import {CGFobject,CGFappearance, CGFscene } from '../../lib/CGF.js';
import { MySphere} from "./MySphere.js";

/**
* MyFin
* @constructor
*/
export class MyEye extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere1 = new MySphere(this.scene, 16, 16);
        this.sphere2 = new MySphere(this.scene, 16, 16);
    }

    setAngle(angle){
        this.angle= angle*Math.PI/180;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(0,0,0);
        this.scene.white.apply();
        this.sphere1.display(); 
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.25,0.25,0.25);
        this.scene.translate(1.5,0,0);
        this.scene.black.apply();
        this.sphere1.display(); 
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.sphere.enableNormalViz();
    }

    disableNormalViz(){
        this.sphere.disableNormalViz();
    }
}