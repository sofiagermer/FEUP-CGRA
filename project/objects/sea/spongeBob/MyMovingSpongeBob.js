import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";
import { MyMovingObject } from "../../landscape/MyMovingObject.js";
import { MyFish } from "../fish/MyFish.js";

export class MyMovingSpongeBob extends MyMovingObject {
    constructor(scene,spongeBob){
        super(scene, spongeBob);
        this.spongeBob = spongeBob;
        this.initialize();
    }

    initialize(){
        this.catchedRock = false;
        this.fallingRock = false;
        this.rock = null;
        this.nestRocks = [];
        this.indexNestRock = 0;
    }
    
    update(){
        //update fish actual movement
        super.update();

        this.updateRockPos();
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
        }
        else{
            console.log("fora do ninho");
            this.rock.setPosition(this.rock.getX(), 1.3, this.rock.getZ());
        }
    }

    rockInNest() {
        if(Math.hypot(this.coordinates[0],this.coordinates[1],this.coordinates[2]) < 9)
          return true;
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