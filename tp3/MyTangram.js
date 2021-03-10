import {CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyParallelogram } from "./MyParallelogram.js";

class MyTangram extends CGFobject{
    constructor(scene){
        super(scene);
        this.initMatererials();
        this.diamond = new MyDiamond(this.scene);
        this.trianglebig = new MyTriangleBig(this.scene);
        this.trianglebig2 = new MyTriangleBig(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.trianglesmall = new MyTriangleSmall(this.scene);
        this.trianglesmall2 = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
    }
    initMaterials() {
        this.material_diamond = new CGFappearance(this);
        this.material_diamond.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material_diamond.setDiffuse(0.4, 0.8, 0.3,1.0);
        this.material_diamond.setSpecular(0.4, 0.8, 0.3,1.0);
        this.material_diamond.setShininess(10.0);

        this.material_trianglebig = new CGFappearance(this);
        this.material_trianglebig.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material_trianglebig.setDiffuse(1.0, 0.675, 0.078, 1.0);
        this.material_trianglebig.setSpecular(1.0, 0.675, 0.078, 1.0);
        this.material_trianglebig.setShininess(10.0);

        this.material_trianglebig2 = new CGFappearance(this);
        this.material_trianglebig2.setAmbient(0, 0, 0, 1.0);
        this.material_trianglebig2.setDiffuse(0.282, 0.525, 1.0, 1.0);
        this.material_trianglebig2.setSpecular(0.282, 0.525, 1.0, 1.0);
        this.material_trianglebig2.setShininess(10.0);

        this.material_triangle = new CGFappearance(this);
        this.material_triangle.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material_triangle.setDiffuse(1.0, 0.58, 0.725);
        this.material_triangle.setSpecular(1.0, 0.58, 0.725);
        this.material_triangle.setShininess(10.0);

        this.material_trianglesmall = new CGFappearance(this);
        this.material_trianglesmall.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material_trianglesmall.setDiffuse(0.984, 0.161, 0, 1.0);
        this.material_trianglesmall.setSpecular(0.984, 0.161, 0, 1.0);
        this.material_trianglesmall.setShininess(10.0);

        this.material_parallelogram = new CGFappearance(this);
        this.material_parallelogram.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material_parallelogram.setDiffuse(1, 0.867, 0, 1.0);
        this.material_parallelogram.setSpecular(1, 0.867, 0, 1.0);
        this.material_parallelogram.setShininess(10.0);

        this.material_trianglesmall2 = new CGFappearance(this);
        this.material_trianglesmall2.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material_trianglesmall2.setDiffuse(0.459, 0, 0.686, 1.0);
        this.material_trianglesmall2.setSpecular(0.459, 0, 0.686, 1.0);
        this.material_trianglesmall2.setShininess(10.0);

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
      

        this.material_diamond.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(trans);
        this.scene.multMatrix(rot);
        //this.material_diamond.apply();
        this.diamond.display();
        this.scene.popMatrix();

        this.material_trianglebig.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.85,0,0);
        //this.material_trianglebig.apply();
        this.trianglebig.display();
        this.scene.popMatrix();
        
        this.material_trianglebig2.apply();
        this.scene.pushMatrix();
        this.scene.translate(-1.4,-1.4,0);
        this.scene.rotate(-Math.PI/4, 0,0 ,1);
        //this.material_trianglebig2.apply();
        this.trianglebig2.display();
        this.scene.popMatrix();

        this.material_triangle.apply();
        this.scene.pushMatrix();
        this.scene.translate(1.1,1.45,0);
        this.scene.rotate(Math.PI/4, 0,0 ,1);
        //this.material_triangle.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.material_trianglesmall.apply();
        this.scene.pushMatrix();
        this.scene.translate(2.7,1.45,0);
        //this.material_trianglesmall.apply();
        this.trianglesmall.display();
        this.scene.popMatrix();

        this.material_parallelogram.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        //this.material_parallelogram.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.material_trianglesmall2.apply();
        this.scene.pushMatrix();
        this.scene.translate(3,-1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        //this.material_trianglesmall2.apply();
        this.trianglesmall2.display();
        this.scene.popMatrix();
    
        }
        enableNormalViz(){
            this.diamond.enableNormalViz();
            this.trianglebig.enableNormalViz();
            this.trianglebig2.enableNormalViz();
            this.triangle.enableNormalViz();
            this.trianglesmall.enableNormalViz();
            this.parallelogram.enableNormalViz();
            this.trianglesmall2.enableNormalViz();
        }
        disableNormalViz() {
            this.diamond.disableNormalViz();
            this.trianglebig.disableNormalViz();
            this.trianglebig2.disableNormalViz();
            this.triangle.disableNormalViz();
            this.trianglesmall.disableNormalViz();
            this.parallelogram.disableNormalViz();
            this.trianglesmall2.disableNormalViz();
        }   
}

