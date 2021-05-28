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
        
        var objects = this.gui.addFolder('Objects')
        //Checkbox element in GUI
        objects.add(this.scene, 'displayAxis').name('Display Axis');
        objects.add(this.scene, 'displayCubeMap').name('Display Cube');
        objects.add(this.scene, 'displayCylinder').name('Display Cylinder');
        objects.add(this.scene, 'displaySphere').name('Display Sphere');
        objects.add(this.scene, 'displayFish').name('Display Fish');
        objects.add(this.scene, 'displaySeaFloor').name('Display Sea Floor');
        objects.add(this.scene, 'displayPillars').name('Display Pillars');
        objects.add(this.scene, 'displayWater').name('Display Water');
        objects.add(this.scene, 'displayPineapple').name('Display Pine');
        objects.add(this.scene, 'displaySpongeBob').name('Display Sponge');

        //Slider element in GUI
        var movement = this.gui.addFolder('Movement');
        movement.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        movement.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        //Dropdown for textures
        this.gui.add(this.scene, 'selectedTexture', this.scene.texturesID).name('Cube Texture').onChange(this.scene.updateTextures.bind(this.scene));

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

    };
}