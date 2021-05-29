import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";

/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, object) {
        super(scene);
        this.object = object;

        //Initial variables
        this.reset();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.coordinates[0], this.coordinates[1], this.coordinates[2]);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);
        this.object.display();
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.object.enableNormalViz();
    }
    
    disableNormalViz(){
        this.object.disableNormalViz();
    }

    turn(val) {
        //Changes orientation
        this.orientationAngle += val;
        this.orientationAngle %= 2*Math.PI;
    }
    
    accelerate(val) {
        //Increases speed
        this.object.speed += val;
        if(this.object.speed < 0 ) this.object.speed = 0;
    }

    up(){
        if(this.coordinates[1] < 5) this.coordinates[1] += 0.1;
    }

    down(){
        if(this.coordinates[1] > 1.3) this.coordinates[1] -= 0.1;
    }
    
    update(){
        this.coordinates[0] += this.object.speed* this.scene.speedFactor * Math.sin(this.orientationAngle - Math.PI/2);
        this.coordinates[2] += this.object.speed* this.scene.speedFactor * Math.cos(this.orientationAngle - Math.PI/2);
    }

    reset() {
        //Resets initial position
        this.object.speed = 0.0;
        this.orientationAngle = 0.0;
        this.coordinates = [0.0, 5.0, 0.0];
    }
}


