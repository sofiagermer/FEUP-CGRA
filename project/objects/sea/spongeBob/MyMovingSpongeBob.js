import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyFish } from "./MyFish.js";

export class MyMovingSpongeBob extends MyMovingObject {
    constructor(scene,spongeBob){
        super(scene, spongeBob);
        this.spongeBob = spongeBob;
        this.catchedRock = false;
        this.fallingRock = false;
        this.rock = null;
        this.turningRight = false;
        this.turningLeft = false;
    }
    
    update(){
        super.update();

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