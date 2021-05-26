import { CGFappearance, CGFobject, CGFtexture } from "../../../lib/CGF.js";
import { MyQuad } from "../basic_shapes/MyQuad.js";

export class MyCubeMap extends CGFobject {
    constructor(scene){
        super(scene);
        this.enableLinearFiltering = false;
        this.initBuffers();
    }
    initBuffers() {
        this.scene.face = new MyQuad(this.scene);

        //Material
        this.materialCube = new CGFappearance(this.scene);
        this.materialCube.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.materialCube.setDiffuse(0.0, 0.0, 0.0, 0.0);
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
        this.scene.pushMatrix();
        this.scene.scale(50, 50, 50);

        //Back
        this.scene.pushMatrix();
        this.scene.translate(0,0, -0.5);
        this.scene.rotate(Math.PI, 0,1,0);
        this.changeFiltering();
        this.materialCube.setTexture(this.scene.textureBack);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.changeFiltering();
        this.materialCube.setTexture(this.scene.textureFront);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //Bottom
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.changeFiltering();
        this.materialCube.setTexture(this.scene.textureBottom);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //Top
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.changeFiltering();
        this.materialCube.setTexture(this.scene.textureTop);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.changeFiltering();
        this.materialCube.setTexture(this.scene.textureLeft);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.changeFiltering();
        this.materialCube.setTexture(this.scene.textureRight);
        this.materialCube.apply();
        this.scene.face.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }
}