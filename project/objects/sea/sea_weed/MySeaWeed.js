import { CGFappearance, CGFobject, CGFtexture, CGFshader } from "../../../../lib/CGF.js";
import { MyPyramid } from "../../basic_shapes/MyPyramid.js";

export class MySeaWeed extends CGFobject {
    constructor(scene, slices, stacks, offset, size, ang){
        super(scene);
        this.scene = scene;

        this.pyramid = new MyPyramid(this.scene, slices, stacks);

        this.offset = offset;
        this.size = size;
        this.ang = ang;
        
        this.initShaders();
        this.initTexture();
        this.changePos();
    }

    initShaders(){
        this.scene.seaWeedShader = new CGFshader(this.scene.gl, 'shaders/seaweed.vert', 'shaders/seaweed.frag');

    }

    
    initTexture(){
        this.scene.weedTexture = new CGFtexture(this.scene, "images/sea_water.jpg");
        this.scene.seaWeedShader.setUniformsValues({ weedTex: 0 });


    }

    generatePos(minAng, height, maxAng){
        let ang = Math.random() * 2.0 * Math.PI;
        let radius = Math.random() * (maxAng - minAng) + minAng;
        
        let x = radius * Math.cos(ang);
        let z = radius * Math.sin(ang);
            
        return [x, height, z];
    }

    changePos(){
        const LIMIT_Y = 0;
        const LIMIT_Z = this.offset - 1.0;

        this.position = this.generatePos(this.ang, LIMIT_Y, LIMIT_Z);

        this.height = (Math.random() * this.offset) % 2.0 + 1.0;

        this.phase = Math.random() * (0.1 - 0.125) * 0.125;
    }
    
    display(){

        this.scene.weedTexture.bind(0);
        this.scene.pushMatrix();
            
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.scale(0.5, this.height, 0.5);

            this.scene.seaWeedShader.setUniformsValues({ phaseFactor: this.phase });
            
            this.pyramid.display();
        this.scene.popMatrix();
    }

}