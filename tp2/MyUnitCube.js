import {CGFobject } from "../lib/CGF.js";

export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
    initBuffers() {
        this.vertices = [
        -0.5, 0.5,-0.5, //0
        -0.5,-0.5,-0.5, //1
         0.5,-0.5,-0.5, //2
         0.5, 0.5,-0.5, //3
        -0.5, 0.5, 0.5, //4
        -0.5,-0.5, 0.5, //5
         0.5,-0.5, 0.5, //6
         0.5, 0.5, 0.5, //7
        ];

        this.indices = [
            0,3,2,
            1,0,2,
            3,0,7,
            0,4,7,
            4,0,1,
            1,5,4,
            5,1,2,
            2,6,5,
            2,3,7,
            4,7,3,
            7,6,2,
            6,7,4,
            6,4,5
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}