import {CGFobject} from '../../../../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPyramidStack extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.pyramidStack = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var height = 0;
        var heightInc = 1/(this.pyramidStack + 1);

        for(var j = 0; j < this.pyramidStack; j++){
            for(var i = 0; i < this.slices; i++){
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different

                var factor = 1 - height;

                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);

                this.vertices.push(ca*factor, height, -sa*factor);
                this.vertices.push(caa*factor, height, -saa*factor);

                // triangle normal computed by cross product of two edges
                var normal= [
                    saa-sa,
                    ca*saa-sa*caa,
                    caa-ca
                ];

                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );

                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;

                // push normal once for each vertex of this triangle
                this.normals.push(...normal);
                this.normals.push(...normal);

                if(j > 0) {
                    if (j < this.pyramidStack-1) {
                        this.indices.push(2*(i + j*this.slices), (2*(i + (j-1)*this.slices)+1) , (2*(i + j*this.slices)+1) );
                    }
                    this.indices.push(2*(i + j*this.slices)+1, (2*(i + (j-1)*this.slices)+1) , (2*(i + (j-1)*this.slices)+1) );
                }
                ang+=alphaAng;
            }

            height += heightInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
   
    
}