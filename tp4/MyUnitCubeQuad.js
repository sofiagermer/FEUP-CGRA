import {CGFappearance, CGFobject, CGFtexture} from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene, top, bottom, side){
        super(scene);
 
        this.textureTop = new CGFtexture(this.scene, top)
        this.textureBottom = new CGFtexture(this.scene, bottom);
        this.textureSide = new CGFtexture(this.scene, side);
        this.initBuffers();
    }


    initBuffers(){
        //Initialize scene objects
        this.scene.face= new MyQuad(this.scene);
        this.materialTop= new CGFappearance(this.scene);
        this.materialTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialTop.setShininess(10.0);
        this.materialTop.setTexture(this.textureTop);
       

        this.materialBottom= new CGFappearance(this.scene);
        this.materialBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialBottom.setShininess(10.0);
        this.materialBottom.setTexture(this.textureBottom);


        this.materialSide= new CGFappearance(this.scene);
        this.materialSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialSide.setShininess(10.0);
        this.materialSide.setTexture(this.textureSide);

    }

    display(){
        //bottom
        this.materialBottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0,0, -0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.face.display();
        this.scene.popMatrix(); 

        //top
        this.materialTop.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.face.display();
        this.scene.popMatrix();

        //left
        this.materialSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.face.display();
        this.scene.popMatrix();

        //right
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.face.display();
        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.face.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.face.display();
        this.scene.popMatrix();
    }
   
}