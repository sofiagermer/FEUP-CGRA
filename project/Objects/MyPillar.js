import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyPillar extends CGFobject {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.enableLinearFiltering = false;

        this.cylinders_list = [];
        for (var i = 0; i < 15 ; i++){
            this.cylinders_list.push(new MyCylinder(this.scene, 200));
        }

        this.initBuffers();
    }
    initBuffers() {

        //Material
        this.pipeTexture = new CGFtexture(this.scene, "images/pillar/ferrugem.jpg")

        this.materialPipe = new CGFappearance(this.scene);
        this.materialPipe.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.materialPipe.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.materialPipe.setEmission(1.0, 1.0, 1.0, 1.0);
        this.materialPipe.setShininess(10.0);
        this.materialPipe.setTexture(this.pipeTexture);
        this.materialPipe.setTextureWrap('REPEAT', 'REPEAT');

        
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
        this.scene.scale(0.5,1,0.5);
        this.materialPipe.apply();
        for(var i = 0; i < 15; i++){
            this.cylinders_list[i].display();
            this.scene.translate(0,1,0);
        }
        this.scene.popMatrix();
    }
}