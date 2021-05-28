import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";
import { MyMovingObject } from "../../landscape/MyMovingObject.js";
import { MyFish } from "./MyFish.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene,fish){
        super(scene, fish);
        this.fish = fish;
        this.initializeMovingFish();
    }

    initializeMovingFish(){
        this.catchedRock = false;
        this.fallingRock = false;
        this.rock = null;
        this.turningRight = false;
        this.turningLeft = false;
        this.nestRocks = [];
        this.indexNestRock = 0;
    }
    
    update(){
        //update fish actual movement
        super.update();
        
        //update fish fin's movement
        this.fish.update(this.turningRight, this.turningLeft);
        this.turningLeft = false;
        this.turningRight = false;

        this.updateRockPos();
    }

    turn(val){
        super.turn(val);
        if(val > 0){
            this.turningLeft = true;
        }
        else{
            this.turningRight = true;
        }
    }

    controlRock(){
        if(this.catchedRock) {
            this.letGoRock();
            this.catchedRock = false;
            this.rock = null;
        }
        else {
            this.catchRock();
        }
    }

    catchRock() {
        this.rock = this.scene.rockSet.rockNearby(this.coordinates);
        if (this.rock != null) {
            this.catchedRock = true;
        }
    }

    letGoRock(){
        if(this.rockInNest()){
            console.log("dentro do ninho");
            this.rock.setPosition(this.indexNestRock -3, 1.3, this.indexNestRock -3);
        }
        else{
            console.log("fora do ninho");
            this.rock.setPosition(this.rock.getX(), 1.3, this.rock.getZ());
        }
    }

    rockInNest(){
        if(this.rock.getX < 3 && this.rock.getX > -3){
            if(this.rock.getZ < 3 && this.rock.getZ >-3){
                return true;
            }
        }
        return false;
    }

    updateRockPos() {
        if (this.catchedRock) {
            var newPosition = [];
            newPosition.push(this.coordinates[0] + Math.sin(this.orientationAngle - Math.PI/2), this.coordinates[1], this.coordinates[2] + Math.cos(this.orientationAngle - Math.PI/2));
            this.rock.setPosition(newPosition[0], newPosition[1], newPosition[2]);
        }
    }
    
    reset() {
        if (this.catchedRock) {
            this.rock.setPosition(this.rock.getInitialX(), this.rock.getInitialY(), this.rock.getInitialZ());
            this.catchedRock = false;
            this.rock = null;
        }
        super.reset();
    }
}