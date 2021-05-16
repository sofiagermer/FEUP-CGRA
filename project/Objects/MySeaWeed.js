import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyPyramidStack } from "./MyPyramidStack.js";

export class MySeaWeed extends CGFobject {
    constructor(scene, scale, translate_x, translate_z, rotate){
        super(scene);
        this.scene = scene;
        this.scale = scale;
        this.translate_x = translate_x;
        this.translate_z = translate_z;
        this.rotate = rotate;
        this.seaWeed = new MyPyramidStack(this.scene, 5, 20);

        this.initBuffers();
    }
    initBuffers() {

        this.scene.materialWeed = new CGFappearance(this.scene);
        this.scene.materialWeed.setAmbient(0.0, 0.8, 0.0, 1.0);
        this.scene.materialWeed.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.scene.materialWeed.setSpecular(1.0,1.0,1.0,1.0);
        this.scene.materialWeed.setEmission(0.0, 0.0, 0.0, 1.0);
        this.scene.materialWeed.setShininess(10.0);  
        
    }

    
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.translate_x, 0, this.translate_z);
        this.scene.scale(0.2,3,0.2);
        this.scene.rotate(this.rotate,0,1,0);
        this.scene.materialWeed.apply();
        this.seaWeed.display();
        this.scene.popMatrix();
    }
}