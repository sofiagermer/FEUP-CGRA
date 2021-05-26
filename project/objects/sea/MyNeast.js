import {CGFobject, CGFtexture, CGFappearance, CGFshader} from '../../../lib/CGF.js';
import {MyRock} from './rock/MyRock.js';
import {MySphere} from "../basic_shapes/MySphere.js";
import {MySeaWeed} from "./sea_weed/MySeaWeed.js";
import {MyWeedSet} from "./sea_weed/MyWeedSet.js";

export class MyNeast  extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 16, 16);
        this.initMaterials();
    }

   initMaterials() { 
    //Material
        this.pineapple = new CGFtexture(this.scene, "images/pineapple.png");
        
        this.materialPineapple = new CGFappearance(this.scene);
        this.materialPineapple.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.materialPineapple.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.materialPineapple.setEmission(1.0, 1.0, 1.0, 1.0);
        this.materialPineapple.setShininess(10.0);
        this.materialPineapple.setTexture(this.pineapple);
        this.materialPineapple.setTextureWrap('REPEAT', 'REPEAT'); 
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
    this.scene.scale(0.5,0.5,0.5);
    this.scene.translate(0,0,0);
    this.materialPineapple.apply();
    this.sphere.display(); 
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
