import {CGFobject,CGFappearance, CGFscene, CGFshader , CGFtexture} from '../../lib/CGF.js';
import {MyPlane} from '../Objects/MyPlane.js';
import {MyRockSet} from '../Objects/MyRockSet.js';

export class MySeaFloor extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sand = new MyPlane(this.scene, 50);
        this.rock = new MyRockSet(this.scene, 5);
  
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
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(50,50,50);
        this.sand.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        this.dimensions();
        

        /*
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.scene.shaderSeaFloor));
        this.scene.materialSandTex.bind(1);
        this.scene.materialSandMap.bind(2);
        this.sand.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();*/
    }
    dimensions(){
        for (var i = 0; i < 5; i++){
            this.scene.pushMatrix();    
            this.scene.translate(this.rock.rockSet[i].transX, 1, this.rock.rockSet[i].transZ);
            this.scene.rotate(Math.PI/2,0,1,0);
            this.scene.scale( this.rock.rockSet[i].scale,  this.rock.rockSet[i].scale,  this.rock.rockSet[i].scale); 
            this.scene.materialRock.apply();
            this.rock.rockSet[i].display();
            this.scene.popMatrix();
        }
    }
}