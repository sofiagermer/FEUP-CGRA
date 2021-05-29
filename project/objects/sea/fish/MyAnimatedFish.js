
import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";
import { MyMovingObject } from "../../landscape/MyMovingObject.js";
import { MyFish } from "./MyFish.js";
import { MyMovingFish } from "./MyMovingFish.js";
/**
 * MyAnimatedFish
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyAnimatedFish extends MyMovingObject {
    constructor(scene, startX, startY, startZ) {
        let fish = new MyMovingFish(scene, new MyFish(scene));
        super(scene, fish);
        this.moving_fish = fish;
        this.scene = scene;
        this.ang = Math.random() * 2.0 * Math.PI;
        this.position = [startX, startY, startZ];
    }

    move(value) {
        this.pos = value;
    }

    change_angle(value) {
        this.ang = value;
    }
    
    update() {
        this.move([3*Math.sin(this.ang)+this.position[0], this.position[1], 3*Math.cos(this.ang)+this.position[2]]);
        this.ang -= Math.PI/100;  
        this.change_angle(this.ang);
    }
   

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.ang,0,1,0);
        this.object.display();
        this.scene.popMatrix();
    
    }
      
}