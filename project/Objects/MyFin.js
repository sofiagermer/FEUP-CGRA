import {CGFobject,CGFappearance, CGFscene } from '../../lib/CGF.js';
import {MyTriangle} from '../Objects/MyTriangle.js';
/**
* MyFin
* @constructor
*/
export class MyFin extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangle(this.scene);
    }

    setAngle(angle){
        this.angle= angle*Math.PI/180;
    }

    display(){
        this.triangle.display();
    }

    enableNormalViz(){
        this.triangle.enableNormalViz();
    }

    disableNormalViz(){
        this.triangle.disableNormalViz();
    }
}