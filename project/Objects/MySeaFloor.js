import {CGFobject,CGFappearance, CGFscene, CGFshader , CGFtexture} from '../../lib/CGF.js';
import {MyPlane} from '../Objects/MyPlane.js';
import {MyRockSet} from '../Objects/MyRockSet.js';
import {MyPillar} from '../Objects/MyPillar.js';
import { MyWeedSet } from './MyWeedSet.js';

export class MySeaFloor extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sand = new MyPlane(this.scene, 50);
        this.rock = new MyRockSet(this.scene, 5);
        this.pillars_list = [];
        for(var i = 0; i < 4 ; i++){
            this.pillars_list.push(new MyPillar(this.scene))
        }
        this.weed = new MyWeedSet(this.scene,20);
  
        this.initShaders();
    }

    initShaders(){
        this.scene.textureSand = new CGFtexture(this.scene, "images/seafloor/sand.png");
        this.scene.textureSandMap = new CGFtexture(this.scene, "images/seafloor/sandMap.png");
        this.scene.shaderSeaFloor = new CGFshader(this.scene.gl, "shaders/seafloor.vert", "shaders/seafloor.frag");
        this.scene.shaderSeaFloor.setUniformsValues({sandTex: 0});
        this.scene.shaderSeaFloor.setUniformsValues({sandMap: 1});
        this.scene.shaderSeaWeed = new CGFshader(this.scene.gl, "shaders/seaweed.vert", "shaders/seaweed.frag"); 
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

        this.dimensions();
        this.displayPillars();
        this.displayWeed();
        

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

    displayPillars(){
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3,0,0);
        this.pillars_list[0].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3,0,-4);
        this.pillars_list[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10,0,0);
        this.pillars_list[2].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10,0,-4);
        this.pillars_list[3].display();
        this.scene.popMatrix();

    }

    displayWeed(){
        this.scene.pushMatrix();
        for(var i = 0; i < 20; i++){
            this.scene.setActiveShader(this.scene.shaderSeaWeed);
            this.weed.weedSet[i].display();
            this.scene.setActiveShader(this.scene.defaultShader);
        }
        this.scene.popMatrix();
    }
}