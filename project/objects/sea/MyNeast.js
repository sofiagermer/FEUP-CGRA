import {CGFobject, CGFtexture, CGFappearance, CGFshader} from '../../../lib/CGF.js';
import {MyRock} from './rock/MyRock.js';
import {MySphere} from "../basic_shapes/MySphere.js";
import {MySeaWeed} from "./sea_weed/MySeaWeed.js";
import {MyWeedSet} from "./sea_weed/MyWeedSet.js";

export class MyNeast  extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 16, 16);
        this.crown = new MyRock(this.scene, 16, 16, 0, 0, 3, 0);
        this.initMaterials();
    }

   initMaterials() { 
    //Material
        this.pineapple = new CGFtexture(this.scene, "images/pineapple.png");
        this.crowTexture = new CGFtexture(this.scene, "images/sea_water.jpg");

        
        this.materialPineapple = new CGFappearance(this.scene);
        this.materialPineapple.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.materialPineapple.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.materialPineapple.setEmission(1.0, 1.0, 1.0, 1.0);
        this.materialPineapple.setShininess(10.0);
        this.materialPineapple.setTexture(this.pineapple);
        this.materialPineapple.setTextureWrap('REPEAT', 'REPEAT');
        
        
        this.materialCrown = new CGFappearance(this.scene);
        this.materialCrown.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.materialCrown.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.materialCrown.setEmission(1.0, 1.0, 1.0, 1.0);
        this.materialCrown.setShininess(10.0);
        this.materialCrown.setTexture(this.crowTexture);
        this.materialCrown.setTextureWrap('REPEAT', 'REPEAT');
        

    }

    changeFiltering() {
        if (this.enableLinearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }

displaySmallPinneapple(){
    this.scene.pushMatrix();
    this.scene.scale(0.5,0.5,0.5);
    this.scene.translate(0,0,0);
    this.materialPineapple.apply();
    this.sphere.display(); 
    this.scene.popMatrix();
   

    this.scene.pushMatrix();
    this.scene.scale(0.24,0.24,0.24);
    this.scene.translate(0,3,0);
    this.materialCrown.apply();
    this.crown.display(); 
    this.scene.popMatrix();
}
display(){
    this.scene.pushMatrix();
    this.scene.scale(7,7,7);
    this.scene.scale(0.6,0.8,0.6);
    this.scene.translate(0,0.5,0);
    this.displaySmallPinneapple();
    this.scene.popMatrix();
}

enableNormalViz(){
    this.sphere.enableNormalViz();
    this.weed.enableNormalViz();
}

disableNormalViz(){
    this.sphere.disableNormalViz();
    this.weed.disableNormalViz();
}
}