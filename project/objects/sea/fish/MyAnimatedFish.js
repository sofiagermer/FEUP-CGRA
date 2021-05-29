
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
        this.circle_angle = Math.random() * 2.0 * Math.PI;
        this.startX = startX;
        this.startY = startY;
        this.startZ = startZ;
        this.pos = [this.startX, this.startY, this.startZ];
    }

    move(value) {
        this.pos = value;
    }

    change_angle(value) {
        this.circle_angle = value;
    }


    update() {
        this.move([3*Math.sin(this.circle_angle)+this.startX,this.startY,3*Math.cos(this.circle_angle)+this.startZ]);
        this.circle_angle -= Math.PI/100;  
        this.change_angle(this.circle_angle);
    }
   

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.rotate(this.circle_angle,0,1,0);
        this.object.display();
        this.scene.popMatrix();
    
    }
      
}