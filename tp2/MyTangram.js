import {CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyParallelogram } from "./MyParallelogram.js";

export class MyTangram extends CGFobject{
    constructor(scene){
        super(scene);
        this.init();
    }

    init(){
        //Initialize scene objects
        this.diamond = new MyDiamond(this.scene);
        this.trianglebig = new MyTriangleBig(this.scene);
        this.trianglebig2 = new MyTriangleBig(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.trianglesmall = new MyTriangleSmall(this.scene);
        this.trianglesmall2 = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
    }

    display(){
        var trans = [
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            -3.51,
            0.0,
            0.0,
            1.0,
          ];
      
        var rot = [
            Math.cos(Math.PI/4.0),
            Math.sin(Math.PI/4.0),
            0.0,
            0.0,
            -Math.sin(Math.PI/4.0),
            Math.cos(Math.PI/4.0),
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0
          ];
      

    
        this.scene.pushMatrix();
        this.scene.multMatrix(trans);
        this.scene.multMatrix(rot);
        this.scene.setDefaultAppearance(0.4, 0.8, 0.3, 1);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.setDefaultAppearance(1.0, 0.675, 0.078, 1);
        this.scene.translate(-0.85,0,0);
        this.trianglebig.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-1.4,-1.4,0);
        this.scene.rotate(-Math.PI/4, 0,0 ,1);
        this.scene.setDefaultAppearance(0.282, 0.525, 1.0, 1);
        this.trianglebig2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.1,1.45,0);
        this.scene.rotate(Math.PI/4, 0,0 ,1);
        this.scene.setDefaultAppearance(1.0, 0.58, 0.725, 1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.7,1.45,0);
        this.scene.setDefaultAppearance(0.984, 0.161, 0, 1);
        this.trianglesmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.setDefaultAppearance(1, 0.867, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3,-1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.setDefaultAppearance(0.459, 0, 0.686, 1);
        this.trianglesmall2.display();
        this.scene.popMatrix();
    }
}