import {CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene){
        super(scene);
        this.init();
    }

    init(){
        //Initialize scene objects
        this.face= new MyQuad(this.scene);
    }

    display(){

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        //this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.setDefaultAppearance(0.459, 0, 0.686, 1);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        //this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.setDefaultAppearance(0.459, 0, 0.686, 1);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.setDefaultAppearance(0.459, 0, 0.686, 1);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.setDefaultAppearance(0.459, 0, 0.686, 1);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.setDefaultAppearance(0.459, 0, 0.686, 1);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.setDefaultAppearance(0.459, 0, 0.686, 1);
        this.face.display();
        this.scene.popMatrix();
    }
}