import { CGFappearance, CGFobject, CGFtexture } from "../../../../lib/CGF.js";
import { MyCylinder } from "../../basic_shapes/MyCylinder.js";

export class MyPillar extends CGFobject {
    constructor(scene) {
      super(scene);
  
      this.cylinders_list = [];
      for (var i = 0; i < 15 ; i++){
          this.cylinders_list.push(new MyCylinder(this.scene, 200));
      }

      this.initMaterials();
    }
  
    initMaterials() {
        this.materialPillar = new CGFappearance(this.scene);
        this.materialPillar.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.materialPillar.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.materialPillar.setEmission(1.0, 1.0, 1.0, 1.0);
        this.materialPillar.setShininess(10.0);
        this.materialPillar.loadTexture("images/pillar/ferrugem.jpg");
        this.materialPillar.setTextureWrap('REPEAT', 'REPEAT'); 
    }
  
    display() {
      this.scene.pushMatrix();
      this.materialPillar.apply();
      for(var i = 0; i < 15; i++){
        this.cylinders_list[i].display();
        this.scene.translate(0,1,0);
      }
      this.scene.popMatrix();
    }
  }