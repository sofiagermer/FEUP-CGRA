import {CGFobject, CGFtexture, CGFappearance} from "../lib/CGF.js";
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
        this.trianglebig = new MyTriangleBig(this.scene, "orange");
        this.trianglebig2 = new MyTriangleBig(this.scene , "blue");
        this.triangle = new MyTriangle(this.scene);
        this.trianglesmall = new MyTriangleSmall(this.scene, "red");
        this.trianglesmall2 = new MyTriangleSmall(this.scene, "purple");
        this.parallelogram = new MyParallelogram(this.scene);
        
        //Applied Material
        this.scene.materialTangram = new CGFappearance(this.scene);
        this.scene.materialTangram.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.materialTangram.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.materialTangram.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.materialTangram.setShininess(10.0);
        this.scene.materialTangram.loadTexture('images/tangram.png');
        //this.scene.materialDiamond.setTextureWrap('REPEAT', 'REPEAT');
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
      
        this.scene.materialTangram.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(trans);
        this.scene.multMatrix(rot);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.85,0,0);
        this.trianglebig.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-1.4,-1.4,0);
        this.scene.rotate(-Math.PI/4, 0,0 ,1);
        this.trianglebig2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.1,1.45,0);
        this.scene.rotate(Math.PI/4, 0,0 ,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.7,1.45,0);
        this.trianglesmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3,-1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.trianglesmall2.display();
        this.scene.popMatrix();
    }
}