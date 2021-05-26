import {CGFobject,CGFappearance, CGFscene, CGFshader , CGFtexture} from '../../../lib/CGF.js';
import {MyPlane} from '../basic_shapes/MyPlane.js';
import {MyRockSet} from './rock/MyRockSet.js';

export class MyWater extends CGFobject {
    constructor(scene) {
        super(scene);
        this.water= new MyPlane(this.scene, 50);  
        this.initShaders();
    }

    initShaders(){
        this.scene.textureWater = new CGFtexture(this.scene, "images/water/pier.jpg");
        this.scene.textureWaterMap = new CGFtexture(this.scene, "images/water/distortionmap.png");
        this.scene.shaderWater = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
        this.scene.shaderWater.setUniformsValues({waterTex: 1});
        this.scene.shaderWater.setUniformsValues({WaterMap: 0});
    }

    display(){
        this.scene.setActiveShader(this.scene.shaderWater);
        this.scene.textureWaterMap.bind(0);
        this.scene.textureWater.bind(1);
        this.scene.pushMatrix();
        this.scene.translate(0,10,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(50,50,50);
        this.water.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}