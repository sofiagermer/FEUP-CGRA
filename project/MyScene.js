import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./Objects/MySphere.js";
import { MyMovingObject } from "./Objects/MyMovingObject.js";
import { MyCubeMap } from "./Objects/MyCubeMap.js";
import { MyCylinder } from "./Objects/MyCylinder.js";

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
        this.movingObject = new MyMovingObject(this, 4, 2);
        this.cubeMap = new MyCubeMap(this, 'images/demo_cubemap/bottom.png', 'images/demo_cubemap/top.png', 'images/demo_cubemap/left.png', 'images/demo_cubemap/right.png', 'images/demo_cubemap/back.png', 'images/demo_cubemap/front.png');
        this.cylinder = new MyCylinder(this, 19);

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

            //Material
        this.materialSphere = new CGFappearance(this);
        this.materialSphere.setAmbient(0.0,0.0,0.0,0.0);
        this.materialSphere.setDiffuse(0.0,0.0,0.0,0.0);
        this.materialSphere.setSpecular(0.0,0.0,0.0,0.0);
        this.materialSphere.setEmission(1.0,1.0,1.0,1.0);
        this.materialSphere.loadTexture('images/earth.jpg'); 
        
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMovingObject = false;
        this.displayCubeMap = true;
        this.displayCylinder = false;
        this.displaySphere = false;
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
        if (this.displayAxis){
            this.axis.display();
        }

        if(this.displayMovingObject){
            this.movingObject.display();
        }
        
        if(this.displaySphere){
            this.materialSphere.apply();
            this.sphere.display();
        }

        if(this.displayCylinder){
            this.defaultAppearance.apply();
            this.cylinder.display();
        }

        if(this.displayCubeMap){
            this.cubeMap.display();
        }

        // ---- END Primitive drawing section
    }
}
