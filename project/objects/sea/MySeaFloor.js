import {CGFobject,CGFappearance, CGFscene, CGFshader , CGFtexture} from '../../../lib/CGF.js';
import {MyPlane} from '../basic_shapes/MyPlane.js';
import {MyRockSet} from './rock//MyRockSet.js';
import {MyPillar} from './pillar/MyPillar.js';
import { MySeaWeed } from './sea_weed/MySeaWeed.js';
import { MyAnimatedFish } from './fish/MyAnimatedFish.js';

export class MySeaFloor extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sand = new MyPlane(this.scene, 50);       
        this.initShaders();
    }

    initShaders(){
        this.scene.textureSand = new CGFtexture(this.scene, "images/seafloor/sand.png");
        this.scene.textureSandMap = new CGFtexture(this.scene, "images/seafloor/sandMap.png");
        this.scene.shaderSeaFloor = new CGFshader(this.scene.gl, "shaders/seafloor.vert", "shaders/seafloor.frag");
        this.scene.shaderSeaFloor.setUniformsValues({sandTex: 0});
        this.scene.shaderSeaFloor.setUniformsValues({sandMap: 1});
    }

    display(){
        this.scene.setActiveShader(this.scene.shaderSeaFloor);
        this.scene.textureSand.bind(0);
        this.scene.textureSandMap.bind(1);
        this.scene.pushMatrix();
        this.scene.translate(0,-2,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(50,50,1);
        this.sand.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}