import {CGFobject, CGFscene} from '../../../lib/CGF.js';

export class MyCylinder extends CGFobject {
    /**
     * 
     * @param {CGFscene} scene - MySceneObject
     * @param {Integer} slices - Number of sides 
     */
    constructor(scene, slices) {
        super(scene);
        this.scene = scene;
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        const angleDelta = 2 * Math.PI / this.slices;

        this.texCoords = [];
        this.vertices = [];
		this.normals = [];
        for (var i = 0; i <= this.slices; ++i) {
            var pos_x = Math.cos(i * angleDelta);
            var pos_z = Math.sin(i * angleDelta);

            this.vertices.push(pos_x, 0, pos_z, pos_x, 1, pos_z);
            this.normals.push(pos_x, 0, pos_z, pos_x, 0, pos_z);
            this.texCoords.push(-i / this.slices, 1, -i / this.slices, 0);
        }
            
        this.indices = [];
        for (var i = 0, j = 0; i < this.slices; ++i, j += 2) {
            this.indices.push(j + 1, j, j + 2, j + 2, j + 3, j + 1, j + 1, j + 3, j + 2, j + 2, j, j + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
