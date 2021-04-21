import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var objects = this.gui.addFolder('Objects');
        

        //Checkbox element in GUI
        objects.add(this.scene, 'displayAxis').name('Display Axis');
        objects.add(this.scene, 'displaySphere').name('Display Sphere');
        objects.add(this.scene, 'displayMovingObject').name('Display Moving Object');
        objects.add(this.scene, 'displayCylinder').name('Display Cylinder');
      
           
        //Slider element in GUI
        var motion = this.gui.addFolder('Motion');
        motion.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        motion.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        //Dropdown for textures
        var ambientTex = this.gui.addFolder('Ambient Textures');
        ambientTex.add(this.scene, 'selectedTexture', this.scene.ambientTextures).name('Selected Texture').onChange(this.scene.updateAmbient.bind(this.scene));
      
        this.initKeys();
        return true;
    }

    initKeys() {

        // create reference from the scene to the GUI

        this.scene.gui=this;

        

    // disable the processKeyboard function

        this.processKeyboard=function(){};

        

        // create a named array to store which keys are being pressed

        this.activeKeys={};
}

processKeyDown(event) {

        // called when a key is pressed down

        // mark it as active in the array

        this.activeKeys[event.code]=true;

};

processKeyUp(event) {

        // called when a key is released, mark it as inactive in the array

        this.activeKeys[event.code]=false;

};

isKeyPressed(keyCode) {

  if( this.activeKeys[keyCode] === true &&

            (keyCode == "keyL" || keyCode == "keyP")) {

              this.activeKeys[keyCode] = false;

              return true;

    }  

    return this.activeKeys[keyCode] || false;

}
}