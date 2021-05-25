import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./Objects/MySphere.js";
import { MyCubeMap } from "./Objects/MyCubeMap.js";
import { MyCylinder } from "./Objects/MyCylinder.js";
import { MySeaFloor } from "./Objects/MySeaFloor.js";
import { MyWater } from "./Objects/MyWater.js";
import { MyMovingFish } from "./Objects/MyMovingFish.js";
import { MyFish } from "./Objects/MyFish.js";
import { MyRockSet } from "./Objects/MyRockSet.js";
/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Cube Map 
        this.initTextures();
        this.setDefaultTextures();

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cubeMap = new MyCubeMap(this);
        this.cylinder = new MyCylinder(this, 19);
        this.movingFish = new MyMovingFish(this, new MyFish(this));
        this.seaFloor = new MySeaFloor(this);
        this.rockSet = new MyRockSet(this, 5);
        this.water = new MyWater(this);

        this.initAppearence();

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCubeMap = true;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayFish = true;
        this.displaySeaFloor = true;

        this.texturesID = { 'Demo': 0, 'Water': 1, 'Test':2 };
        this.selectedTexture = 1;
        this.updateTextures();
        
        this.scaleFactor = 1;
        this.speedFactor = 1;
    }

    initAppearence(){
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

        this.materialSphere = new CGFappearance(this);
        this.materialSphere.setAmbient(0.0,0.0,0.0,0.0);
        this.materialSphere.setDiffuse(0.0,0.0,0.0,0.0);
        this.materialSphere.setSpecular(0.0,0.0,0.0,0.0);
        this.materialSphere.setEmission(1.0,1.0,1.0,1.0);
        this.materialSphere.loadTexture('images/earth.jpg'); 

    }

    initTextures(){
        this.textureBottom_demo = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.textureTop_demo = new CGFtexture(this, 'images/demo_cubemap/top.png');
        this.textureLeft_demo = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.textureRight_demo = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.textureFront_demo = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.textureBack_demo = new CGFtexture(this, 'images/demo_cubemap/back.png');

        this.textureBottom_test = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.textureTop_test = new CGFtexture(this, 'images/test_cubemap/py.png');
        this.textureLeft_test = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.textureRight_test = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.textureFront_test = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.textureBack_test = new CGFtexture(this, 'images/test_cubemap/pz.png');

        this.textureBottom_water = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');
        this.textureTop_water = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');
        this.textureLeft_water = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');
        this.textureRight_water = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');
        this.textureFront_water = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
        this.textureBack_water = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');
    }

    setDefaultTextures(){
        this.textureBottom = this.textureBottom_demo;
        this.textureTop = this.textureTop_demo;
        this.textureLeft = this.textureLeft_demo;
        this.textureRight = this.textureRight_demo;
        this.textureFront = this.textureFront_demo;
        this.textureBack = this.textureBack_demo;
    }

    updateTextures(){
        if(this.selectedTexture == 1){
            this.textureBottom = this.textureBottom_water;
            this.textureTop = this.textureTop_water;
            this.textureLeft = this.textureLeft_water;
            this.textureRight = this.textureRight_water;
            this.textureFront = this.textureFront_water;
            this.textureBack = this.textureBack_water;
        }
        else if(this.selectedTexture == 2){
            this.textureBottom = this.textureBottom_test;
            this.textureTop = this.textureTop_test;
            this.textureLeft = this.textureLeft_test;
            this.textureRight = this.textureRight_test;
            this.textureFront = this.textureFront_test;
            this.textureBack = this.textureBack_test;
        }
        else{
            this.setDefaultTextures();
        }
    }
    
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.6, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0 , 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }
    
    getSpeedFactor() {
        return this.speedFactor;
    }
    getScaleFactor() {
        return this.scaleFactor;
    }

    checkKeys()  {

        if (this.gui.isKeyPressed("KeyW")) {
            this.movingFish.accelerate(0.01 );
        }

        if (this.gui.isKeyPressed("KeyS"))        {
            this.movingFish.accelerate(-0.01);
        }

        if (this.gui.isKeyPressed("KeyA"))        {
            this.movingFish.turn(-0.1);
        }
        
        if (this.gui.isKeyPressed("KeyD"))        {
            this.movingFish.turn(0.1);
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.movingFish.reset();
        }

        if (this.gui.isKeyPressed("KeyP"))        {
            this.movingFish.up();
        }

        if (this.gui.isKeyPressed("KeyL")) {
            this.movingFish.down();
        }

        if (this.gui.isKeyPressed("KeyC")){ 
            this.movingFish.controlRock();
        }
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.shaderWater.setUniformsValues({ timeFactor: t / 100 % 100 });
        this.shaderSeaWeed.setUniformsValues({ timeFactor: t / 100 % 100 });
        this.movingFish.update(t/300 % 300);
    }
   
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis){
            this.pushMatrix();
            this.axis.display();
            this.popMatrix();
        }
        
        if(this.displaySphere){
            this.pushMatrix();
            this.materialSphere.apply();
            this.sphere.display();
            this.popMatrix();
        }

        if(this.displayCylinder){
            this.pushMatrix();
            this.defaultAppearance.apply();
            this.cylinder.display();
            this.popMatrix();
        }
        
        if(this.displayCubeMap){
            this.pushMatrix();
            this.cubeMap.display();
            this.popMatrix();
        }

        if(this.displaySeaFloor){
            this.pushMatrix();
            this.seaFloor.display();
            this.rockSet.display();
            this.popMatrix();
        }

        this.pushMatrix();
        this.water.display();
        this.popMatrix();

        if(this.displayFish){
            this.pushMatrix();
            this.movingFish.display();
            this.popMatrix();
        } 
    
         
        // ---- END Primitive drawing section
    }
}
