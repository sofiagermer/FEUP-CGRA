import { MyTriangle} from "./MyTriangle.js";
import { MySphere} from "./MySphere.js";
import {CGFobject,CGFappearance, CGFscene } from '../../lib/CGF.js';

/**
 * MyFishBody
 * @constructor
 */
 export class MyFishBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.enableLinearFiltering = false;
        //this.head = new MySphere(scene, 16, 8);
        this.initMaterials();

    }

    initMaterials() {
        this.scene.body = new MySphere(this.scene, 16, 8);

        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(0.7,0.7,0.7,1);
        this.bodyMaterial.setDiffuse(0.9,0.9,0.9,1);
        this.bodyMaterial.setDiffuse(0.2,0.2,0.2,1);
        this.bodyMaterial.setShininess(10);

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
        this.scene.scale(0.6,0.8,1.2);
        this.changeFiltering();
        this.bodyMaterial.setTexture(this.scene.textureBody);
        this.bodyMaterial.apply();
        this.scene.body.display();
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.body.enableNormalViz();
    }
    
    disableNormalViz(){
        this.body.disableNormalViz();
    }
}