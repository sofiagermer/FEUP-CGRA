import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyFish } from "./MyFish.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene,fish){
        super(scene, fish);
        this.fish = fish;
    }
    update(t){
        super.update();
        this.fish.update(t);
    }
}