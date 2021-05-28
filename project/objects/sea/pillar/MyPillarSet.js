import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";
import { MyCylinder } from "../../basic_shapes/MyCylinder.js";
import { MyPillar } from "./MyPillar.js";

export class MyPillarSet extends CGFobject {
    constructor(scene) {
        super(scene);

        this.pillars_list = [];
        for (var i = 0; i < 15 ; i++){
            this.pillars_list.push(new MyPillar(scene));
        }
        this.initBuffers();
    }

    display(){
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5,0,0);
        this.pillars_list[0].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5,0,-4);
        this.pillars_list[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12,0,0);
        this.pillars_list[2].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12,0,-4);
        this.pillars_list[3].display();
        this.scene.popMatrix();
    }
}