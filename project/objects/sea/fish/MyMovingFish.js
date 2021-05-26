import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";
import { MyMovingObject } from "../../landscape/MyMovingObject.js";
import { MyFish } from "./MyFish.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene,fish){
        super(scene, fish);
        this.fish = fish;
        this.catchedRock = false;
        this.fallingRock = false;
        this.rock = null;
        this.turning = 0;
    }
    
    update(t){
        super.update();
        this.fish.update(t);
        this.updateRockPos();
    }

    controlRock(){
        if(this.catchedRock) {
            this.fallingRock = true;
            this.catchedRock = false;
        }
        else this.catchRock();
    }

    catchRock() {
        if (this.coordinates[1] <= 1.5){
            this.rock = this.scene.rockSet.rockNearby(this.coordinates);
            if (this.rock != null) {
                this.catchedRock = true;
            }
        }
    }

    updateRockPos() {
        if (this.catchedRock && !this.fallingRock) {
            var newPosition = [];
            newPosition.push(this.coordinates[0] + Math.sin(this.orientationAngle - Math.PI/2), this.coordinates[1], this.coordinates[2] + Math.cos(this.orientationAngle - Math.PI/2));
            this.rock.setPosition(newPosition[0], newPosition[1], newPosition[2]);
        }
        else if(this.catchedRock && this.fallingRock){
            this.rock.setPosition(this.rock.getX(), 1.3, this.rock.getZ());
            this.fallingRock = false;
            this.rock = null;
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