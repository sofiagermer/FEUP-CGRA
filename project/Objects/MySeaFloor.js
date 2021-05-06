import {CGFobject,CGFappearance, CGFscene, CGFshader , CGFtexture} from '../../lib/CGF.js';
import {MyPlane} from '../Objects/MyPlane.js';
import {MyRockSet} from '../Objects/MyRockSet.js';

export class MySeaFloor extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sand = new MyPlane(this.scene, 50);
        this.rockSet = new MyRockSet(this.scene, 7);
  
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
            this.scene.translate(25,-2.5,25);
            this.scene.rotate(-Math.PI/2,1,0,0);
            this.scene.scale(50,50,50);
            this.sand.display();
            this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        for(var i=0;i<this.rockSet.no_rocks;i++){
            this.scene.pushMatrix();
                this.scene.translate(this.rockSet.rockSet[i].transX,0,this.rockSet.rockSet[i].transZ);
                this.scene.rotate(Math.PI/2,0,1,0);
                this.scene.scale(this.rockSet.rockSet[i].scale,this.rockSet.rockSet[i].scale,this.rockSet.rockSet[i].scale); 
                this.scene.materialRock.apply();
                this.rockSet.rockSet[i].display();
            this.scene.popMatrix();
        }
    }
}