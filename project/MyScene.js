import { CGFscene, CGFcamera, CGFaxis, CGFappearance,CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./Objects/MySphere.js";
import { MyMovingObject } from "./Objects/MyMovingObject.js";
import { MyCubeMap} from "./Objects/MyCubeMap.js";
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
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingPyramid= new MyMovingObject(this,10);
        this.cube = new MyCubeMap(this, 'images/demo_cubemap/bottom.png', 'images/demo_cubemap/top.png', 'images/demo_cubemap/left.png', 
            'images/demo_cubemap/right.png', 'images/demo_cubemap/back.png', 'images/demo_cubemap/front.png');
        this.cylinder = new MyCylinder(this,22)
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


        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMoving=false;
        this.displaySphere=false;
        this.displayCubeMap=true;
        this.displayCylinder=false;
    }
    checkKeys(){
        // Check for key codes e.g. in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")) {
            this.movingPyramid.accelerate(0.01);
        }

        if (this.gui.isKeyPressed("KeyS")){
            this.movingPyramid.accelerate(-0.01);
        }

        if (this.gui.isKeyPressed("KeyA")){
            this.movingPyramid.turn(Math.PI/16);
        }
        if (this.gui.isKeyPressed("KeyD")){
            this.movingPyramid.turn(-Math.PI/16);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.movingPyramid.reset();
        }

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(-15,-2, -5, -1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();
        
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

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        //To be done...
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

        
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if(this.displaySphere){
            this.sphereAppearance.apply();
            this.incompleteSphere.display();
        }
        if(this.displayMoving){
            this.movingPyramid.display();
        }
        if(this.displayCubeMap){
            this.cube.display();
        }
        if(this.displayCylinder){
            this.cylinder.display();
        }

        // ---- END Primitive drawing section
    }
}