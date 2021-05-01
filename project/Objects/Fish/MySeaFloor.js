import {CGFobject,CGFappearance, CGFscene, CGFshader } from '../../../lib/CGF.js';
import { MyPlane } from '../BasicShapes/MyPlane.js';

export class MySeaFloor extends CGFobject {
	constructor(scene) {
		super(scene);
        this.plane = new MyPlane(scene, 50);
        this.initShaders();
		
	}
    initShaders(){
        this.scene.fishShader = new CGFshader(this.scene.gl, "shaders/fish.vert", "shaders/fish.frag");

        this.scene.fishShader.setUniformsValues({ uSampler1: 1 });
        this.scene.fishShader.setUniformsValues({ speed: 0 });
        this.scene.fishShader.setUniformsValues({ timeFactor: 0 });
    }
    update(s, t, a){
        this.scene.fishShader.setUniformsValues({ speed: s });
        this.scene.fishShader.setUniformsValues({ timeFactor: t });
        this.scene.fishShader.setUniformsValues({ acceleration: a});
    }
    display(){

        this.scene.pushMatrix();
        this.scene.translate(2.5,0,2.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(5,5,5);
        this.scene.setActiveShader(this.scene.fishShader );
        this.scene.fishShader.bind(1);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

    }
    enableNormalViz(){
        this.plane.enableNormalViz();
    }

    disableNormalViz(){
        this.plane.disableNormalViz();
    }
}
