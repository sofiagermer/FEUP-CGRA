import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject{
    constructor(scene, top, front, right, back, left, bot, sizeFactor) {
        super(scene);
        this.scene = scene;

        this.initMaterials();

        this.quad = new MyQuad(scene);

        this.updateTextures(top, front, right, back, left, bot);
        this.sizeFactor = sizeFactor;
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0, 0, 0, 0);
        this.material.setDiffuse(0, 0, 0, 0);
        this.material.setSpecular(0, 0, 0, 0);
        this.material.setEmission(1, 1, 1, 1);    
    }
    updateTextures(top, front, right, back, left, bot) {
        this.top = top;
        this.right = right;
        this.left = left;
        this.back = back;
        this.front = front;
        this.bot = bot;
    }

    display() {

        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(this.sizeFactor,this.sizeFactor,this.sizeFactor);

        // Top side
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.material.setTexture(this.top);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Bot side
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.material.setTexture(this.bot);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Right side
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);

        this.material.setTexture(this.right);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Left side
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);

        this.material.setTexture(this.left);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Front side
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);

        this.material.setTexture(this.front);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Back side
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);

        this.material.setTexture(this.back);
        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();

        //????
    }
}
