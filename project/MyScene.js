import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCubeMap } from "./Objects/MyCubeMap.js";
import { MyCylinder } from "./Objects/MyCylinder.js";
import { MyMovingObject } from "./Objects/MyMovingObject.js";
import { MyPyramid } from "./Objects/MyPyramid.js";
import { MySphere } from "./Objects/MySphere.js";

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

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this, 16, 8);

        this.cube = new MyCubeMap(this, this.top, this.front, this.right, this.back, this.left, this.bot, 50);

        this.pyramid = new MyPyramid(this, 6, 1);
        this.movingObject = new MyMovingObject(this, this.pyramid);
        this.cylinder = new MyCylinder(this, 64);


        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.loadTexture('images/earth.jpg');

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displaySphere = false;
        this.displayMovingObject = false;
        this.displayCylinder = true;

        this.selectedTexture = 0;
        this.ambientTextures = { 'Demo': 0, 'Test': 1 };
        this.scaleFactor = 1;
        this.speedFactor = 1;

    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    initAmbient() {
        this.topDemo = new CGFtexture(this,'images/demo_cubemap/top.png');
        this.botDemo = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.leftDemo = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.rightDemo = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.frontDemo = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.backDemo = new CGFtexture(this, 'images/demo_cubemap/back.png');

        this.topTest = new CGFtexture(this,'images/test_cubemap/py.png');
        this.botTest = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.leftTest = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.rightTest = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.frontTest = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.backTest = new CGFtexture(this, 'images/test_cubemap/pz.png');
    }

    updateAmbient() {
        if (this.selectedTexture == 1) {
            this.top = this.topTest;
            this.bot = this.botTest;
            this.left = this.leftTest;
            this.right = this.rightTest;
            this.front = this.frontTest;
            this.back = this.backTest;
        } else {
            this.setDefaultAmbient();
        }

        this.cube.updateTextures(this.top, this.front, this.right, this.back, this.left, this.bot);
    }

    getSpeedFactor() {
        return this.speedFactor;
    }

    getScaleFactor() {
        return this.scaleFactor;
    }

    setDefaultAmbient() {
        this.top = this.topDemo;
        this.bot = this.botDemo;
        this.left = this.leftDemo;
        this.right = this.rightDemo;
        this.front = this.frontDemo;
        this.back = this.backDemo;
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    checkKeys()  {
        var text="Keys pressed: ";

        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")) {

                text+=" W ";
                this.movingObject.accelerate(0.01);
                keysPressed=true;

        }

        if (this.gui.isKeyPressed("KeyS"))        {

                text += " S ";
                this.movingObject.accelerate(-0.01);
                keysPressed = true;

        }

        if (this.gui.isKeyPressed("KeyA"))        {

            text += " A ";
            this.movingObject.turn(-0.01);
            keysPressed = true;

        }
        
        if (this.gui.isKeyPressed("KeyD"))        {

            text += " D ";
            this.movingObject.turn(0.01);
            keysPressed = true;

        }

        if (this.gui.isKeyPressed("KeyR")) {

            text += " R ";
            this.movingObject.reset();
            keysPressed = true;

        }
        
        if (keysPressed)
            console.log(text);

        this.movingObject.update();

  }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
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
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();

        //this.movingObjectApp.apply();
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if(this.displaySphere)
            this.sphere.display();

        if(this.displayMovingObject){
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.movingObject.display();
            this.popMatrix();
        }

        if (this.displayCylinder) {
            this.cylinder.enableNormalViz();
            this.cylinder.display();
        }

        this.defaultAppearance.apply();
        this.cube.display();


        // ---- END Primitive drawing section
    }
}