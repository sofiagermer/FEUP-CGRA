import {CGFobject,CGFappearance, CGFscene } from '../../../../lib/CGF.js';

export class MyTail extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		this.angle = 0;
	}
	
	initBuffers() {
		this.vertices = [
			0,0,0, //0
			1,-1,0, //1
			1,1,0, //2

			0,0,0, //3
			1,-1,0, //4
			1,1,0, //5
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			5,4,3
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,

			0,0,-1,
			0,0,-1,
			0,0,-1,
		];

		this.texCoords =[
			0,1,
			0,0.5,
			0.5,1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    enableNormalViz(){
        this.enableNormalViz();
    }

    disableNormalViz(){
        this.disableNormalViz();
    }
	
}

