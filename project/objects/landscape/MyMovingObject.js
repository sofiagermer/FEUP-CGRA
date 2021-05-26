import {CGFobject,CGFappearance, CGFscene } from '../../../lib/CGF.js';

/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, fish) {
        super(scene);
        this.fish = fish;

        //Initial variables
        this.reset();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.coordinates[0], this.coordinates[1], this.coordinates[2]);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);
        this.fish.display();
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.fish.enableNormalViz();
    }
    
    disableNormalViz(){
        this.fish.disableNormalViz();
    }

    turn(val) {
        //Changes orientation
        this.orientationAngle += val;
        this.orientationAngle %= 2*Math.PI;
    }
    
    accelerate(val) {
        //Increases speed
        this.speed += val;
        if(this.speed < 0 ) this.speed = 0;
        this.fish.updateSpeed(this.speed);
    }

    up(){
        if(this.coordinates[1] < 5) this.coordinates[1] += 0.1;
    }

    down(){
        if(this.coordinates[1] > 1.3) this.coordinates[1] -= 0.1;
    }
    
    update(){
        this.coordinates[0] += this.speed* this.scene.speedFactor * Math.sin(this.orientationAngle - Math.PI/2);
        this.coordinates[2] += this.speed* this.scene.speedFactor * Math.cos(this.orientationAngle - Math.PI/2);
    }

    reset() {
        //Resets initial position
        this.speed = 0.0;
        this.orientationAngle = 0.0;
        this.coordinates = [0.0, 5.0, 0.0];
    }
   
}


