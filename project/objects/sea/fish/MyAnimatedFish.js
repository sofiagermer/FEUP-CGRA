
import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";
import { MyMovingObject } from "../../landscape/MyMovingObject.js";
import { MyFish } from "./MyFish.js";
import { MyMovingFish } from "./MyMovingFish.js";


export class MyAnimatedFish extends MyMovingFish {
    constructor(scene){
        console.log("aqui");
        super(scene, new MyFish(scene));
        this.coordinates = [Math.random() * 35 - 17, Math.random() * 4 + 1, Math.random() * 35 - 17];
        //this.coordinates[0] -= 5;
        this.period = 10;
        this.radius = 5;
        this.lastT = 0.0;
    }

    update() {
        super.update();
        if (this.lastT == 0.0)
            this.lastT = this.scene.t - 1;
        
        super.setVelocity(2 * Math.PI * 5 / (this.period * (1000 / (this.scene.t - this.lastT))));
        super.turn(2 * Math.PI / (this.period * (1000 / (this.scene.t - this.lastT))));
        this.lastT = this.scene.t;
    }

    display() {
        super.display();
    }

}
