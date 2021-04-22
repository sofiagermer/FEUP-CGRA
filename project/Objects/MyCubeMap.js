import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyCubeMap extends CGFobject {
    constructor(scene, bottom, top, left, right, back, front){
        super(scene);
        this.textureBottom = new CGFtexture(this.scene, bottom);
        this.textureTop = new CGFtexture(this.scene, top);
        this.textureLeft = new CGFtexture(this.scene, left);
        this.textureRight = new CGFtexture(this.scene, right);
        this.textureBack = new CGFtexture(this.scene, back);
        this.textureFront = new CGFtexture(this.scene, front);
        this.enableLinearFiltering = false;
        this.initBuffers();
    }
    initBuffers() {
        this.scene.face = new MyQuad(this.scene);

        //Material
        this.materialCube = new CGFappearance(this.scene);
        this.materialCube.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.materialCube.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.materialCube.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.materialCube.setEmission(1.0, 1.0, 1.0, 1.0);
        this.materialCube.setShininess(10.0);
    }
    changeFiltering() {
        if (this.enableLinearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }
    
    display(){
        this.scene.scale(50, 50, 50);
        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0,0, -0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.changeFiltering();
        this.materialCube.setTexture(this.textureBottom);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.changeFiltering();
        this.materialCube.setTexture(this.textureTop);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //left
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.changeFiltering();
        this.materialCube.setTexture(this.textureLeft);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //right
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.changeFiltering();
        this.materialCube.setTexture(this.textureRight);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1)
        this.changeFiltering();
        this.materialCube.setTexture(this.textureBack);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.changeFiltering();
        this.materialCube.setTexture(this.textureFront);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

    }
}