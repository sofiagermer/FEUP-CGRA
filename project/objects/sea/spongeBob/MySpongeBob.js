import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../../../lib/CGF.js';
import {MyQuad} from '../../basic_shapes/MyQuad.js';
/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MySpongeBob extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene.SBface = new MyQuad(this.scene);
        this.initMaterials();
    }

    initMaterials() {
        this.scene.materialSpongeBob = new CGFappearance(this.scene);
        this.scene.materialSpongeBob.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.materialSpongeBob.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialSpongeBob.setEmission(1.0, 1.0, 1.0, 1.0);
        this.scene.materialSpongeBob.setShininess(10.0);
        this.scene.materialSpongeBob.loadTexture('images/spongeBob/spongeBob.png');       
        this.scene.materialSpongeBob.setTextureWrap('REPEAT', 'REPEAT');

        this.scene.materialSpongeBobBottom = new CGFappearance(this.scene);
        this.scene.materialSpongeBobBottom.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.materialSpongeBobBottom.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialSpongeBobBottom.setEmission(1.0, 1.0, 1.0, 1.0);
        this.scene.materialSpongeBobBottom.setShininess(10.0);
        this.scene.materialSpongeBobBottom.loadTexture('images/spongeBob/bottom.png');       
        this.scene.materialSpongeBobBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.scene.materialSpongeBobBack = new CGFappearance(this.scene);
        this.scene.materialSpongeBobBack.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.materialSpongeBobBack.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialSpongeBobBack.setEmission(1.0, 1.0, 1.0, 1.0);
        this.scene.materialSpongeBobBack.setShininess(10.0);
        this.scene.materialSpongeBobBack.loadTexture('images/spongeBob/back.png');       
        this.scene.materialSpongeBobBack.setTextureWrap('REPEAT', 'REPEAT');

        this.scene.materialSpongeBobTop = new CGFappearance(this.scene);
        this.scene.materialSpongeBobTop.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.scene.materialSpongeBobTop.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.scene.materialSpongeBobTop.setEmission(1.0, 1.0, 1.0, 1.0);
        this.scene.materialSpongeBobTop.setShininess(10.0);
        this.scene.materialSpongeBobTop.loadTexture('images/spongeBob/top.png');       
        this.scene.materialSpongeBobTop.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,0,1);
        this.displaySP();
        this.scene.popMatrix();
    }
    displaySP(){
        this.scene.pushMatrix();
        this.scene.scale(1.5,0.75,1.5);
    
        //Left 
        this.scene.pushMatrix();
        this.scene.translate(0,0, -0.5);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.materialSpongeBobBack.apply();
        this.scene.SBface.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.materialSpongeBobBack.apply();
        this.scene.SBface.display();
        this.scene.popMatrix();

        //Top
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.materialSpongeBob.apply();
        this.scene.SBface.display();
        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.materialSpongeBobBack.apply();
        this.scene.SBface.display();
        this.scene.popMatrix();

        //Bottom
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.materialSpongeBobBottom.apply();
        this.scene.SBface.display();
        this.scene.popMatrix();

        //Top
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.materialSpongeBobTop.apply();
        this.scene.SBface.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}