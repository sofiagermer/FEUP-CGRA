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
        if (this.catchedRock){
            this.updateRockPos();
        }
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

    lowerBound(){
        if(this.coordinates[1] < 2) return true;
        return false;
    }

    apanhar(){
        if(this.lowerBound()){
            if(!this.catchedRock){
                this.catchRock();
            }  
        }
    }

    largar(){
        if(this.lowerBound()){
            if(this.catchedRock){
                this.letGoRock();
            }
        }
    }

    catchRock() {
        this.rock = this.scene.rockSet.rockNearby(this.coordinates);
        if (this.rock != null) {
            if(this.rock.rockInNest(this.rock.getX, 1.3, this.rock.getZ) == false){
                this.catchedRock = true;
            }
        }
    }

    letGoRock(){
        if(this.rock.rockInNest(this.rock.getX(), 1.3, this.rock.getZ())){
            if(this.indexNestRock == 0){
                this.rock.setPosition(-1, 1.3, -1);
            }
            else if(this.indexNestRock == 1){
                this.rock.setPosition(-1, 1.3, 0);
            }
            else if(this.indexNestRock == 2){
                this.rock.setPosition(-1, 1.3, 1);
            }
            else if(this.indexNestRock == 3){
                this.rock.setPosition(0, 1.3, -1);
            }
            else if(this.indexNestRock == 4){
                this.rock.setPosition(0, 1.3, 0);
            }
            else if(this.indexNestRock == 5){
                this.rock.setPosition(0, 1.3, 1);
            }
            else if(this.indexNestRock == 6){
                this.rock.setPosition(1, 1.3, -1);
            }
            else if(this.indexNestRock == 7){
                this.rock.setPosition(1, 1.3, 0);
            }
            else if(this.indexNestRock == 8){
                this.rock.setPosition(1, 1.3, 1);
            }
            this.indexNestRock++;
            this.catchedRock = false;
            this.rock = null;
        }
    }

    updateRockPos() {
        var newPosition = [];
        newPosition.push(this.coordinates[0] + Math.sin(this.orientationAngle - Math.PI/2), this.coordinates[1], this.coordinates[2] + Math.cos(this.orientationAngle - Math.PI/2));
        this.rock.setPosition(newPosition[0], newPosition[1], newPosition[2]);
    }
    
    reset() {
        if (this.catchedRock) {
            this.rock.setPosition(this.rock.getInitialX(), this.rock.getInitialY(), this.rock.getInitialZ());
            this.catchedRock = false;
            this.rock = null;
        }
        super.reset();
    }

    setVelocity(speed){
        super.setVelocity(speed);
    }

    display(){
        super.display();
    }
}