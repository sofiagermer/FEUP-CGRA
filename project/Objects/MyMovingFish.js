import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyFish } from "./MyFish.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene,fish){
        super(scene, fish);
        this.fish = fish;
        this.catchedRock = false;
        this.rock = null;
    }
    update(t){
        super.update();
        this.fish.update(t, super.speed);
        this.updateRockPos();
    }

    catchRock() {
        if (this.coordinates[1] <= 1.5 && !this.catchedRock){
            this.rock = this.scene.rockSet.rockNearby(this.coordinates);
            if (this.rock != null) {
                this.catchedRock = true;
            }
        }
    }

    updateRockPos() {
        if (this.catchedRock) {
            var newPosition = [];
            newPosition.push(this.coordinates[0] + 0.75 * Math.sin(this.orientationAngle), this.coordinates[1], this.coordinates[2] + 0.75 * Math.cos(this.orientationAngle));
            this.rock.setPosition(newPosition[0], newPosition[1], newPosition[2]);
        }
    }
    
    reset() {
        super.reset();
        if (this.catchedRock) {
            this.rock.setPosition(this.rock.getInitialPosition());
            this.catchedRock = false;
            this.rock = null;
        }
    }
}