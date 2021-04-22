import {CGFobject,CGFappearance, CGFscene } from '../../lib/CGF.js';
import { MyPyramid} from "./MyPyramid.js";

/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.stacks = stacks;
        this.initMaterials();
        //Movement variables
        this.orientationAngle = 0.0;
        this.speed = 0.0;
        this.coordinates = [0.0, 0.0, 0.0];

        this.pyramid = new MyPyramid(this.scene, 4 , 4);

    }

    initMaterials() {
        this.scene.material_pyramid = new CGFappearance(this.scene);

        this.scene.material_pyramid.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.material_pyramid.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.material_pyramid.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.scene.material_pyramid.setEmission(0,0,0,1);
        this.scene.material_pyramid.setShininess(10.0);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.coordinates[0], this.coordinates[1], this.coordinates[2]);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.material_pyramid.apply();
        this.pyramid.display();
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.pyramid.enableNormalViz();
    }
    
    disableNormalViz(){
        this.pyramid.disableNormalViz();
    }

    turn(val) {
        //Changes orientation
        this.orientationAngle += val;
        this.orientationAngle %= 2*Math.PI;
    }
    accelerate(val) {
        //Increases speed
        this.speed += val;
    }
    
    update(){
        this.coordinates[0] += this.speed*Math.sin(this.orientationAngle);
        this.coordinates[2] += this.speed*Math.cos(this.orientationAngle);
    }

    reset() {
        //Resets initial position
        this.speed = 0.0;
        this.orientationAngle = 0.0;
        this.coordinates = [0.0, 0.0, 0.0];
    }
   
}


