import {CGFobject } from "../../../lib/CGF.js";


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
            2, 1, 0,	// face de baixo
            0, 3, 2,

			3, 0, 4,	// face da direita
			4, 7, 3,

			4, 0, 1,	// face de trás
			1, 5, 4,

			2, 6, 1,	// face da esquerda
			6, 5 , 1,

			7, 6, 2, 	//face da frente
			2, 3, 7,

			7, 4, 5,	// face de cima
			5, 6, 7

       ];
	   this.normals = [
			0,0,-1,		//Normais do cubo no eixo z
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

			0,1,0,		//Normais do cubo no eixo dos y
			0,-1,0,
			0,-1,0,
			0,1,0,
			0,1,0,
			0,-1,0,
			0,-1,0,
			0,1,0,

			-1,0,0,		//Normais do cubo no eixo dos x
			-1,0,0,
			1,0,0,
			1,0,0,
			-1,0,0,
			-1,0,0,
			1,0,0,
			1,0,0,
	   ]

	  /* this.texCoords = [
		0, 1,
		1, 1,
		0, 0,
		1, 0
		]*/
        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

