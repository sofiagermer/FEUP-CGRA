import {CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene, topT, frontT, rightT, backT, leftT, bottomT){
        super(scene);
        this.init();
        this.scene = scene;
        this.topTexture = topT;
        this.frontTexture = frontT;
        this.rightTexture = rightT;
        this.backTexture = backT;
        this.leftTexture = leftT;
        this.bottomTexture = bottomT;
    }


    init(){
        //Initialize scene objects
        this.initMaterials();
        this.face_bot= new MyQuad(this.scene);
        this.face_front= new MyQuad(this.scene);
        this.face_right= new MyQuad(this.scene);
        this.face_left= new MyQuad(this.scene);
        this.face_top= new MyQuad(this.scene);
        this.face_back= new MyQuad(this.scene);
    }

    initMaterials(){
        this.scene.top_text= new CGFappearance(this.scene);
        this.scene.top_text.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.top_text.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.top_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.top_text.setShininess(10.0);
        this.scene.top_text.loadTexture('images/mineTop.png');
        this.scene.top_text.setTextureWrap('REPEAT','REPEAT');

        this.scene.bottom_text= new CGFappearance(this.scene);
        this.scene.bottom_text.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.bottom_text.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.bottom_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.bottom_text.setShininess(10.0);
        this.scene.bottom_text.loadTexture('images/mineTop.png');
        this.scene.bottom_text.setTextureWrap('REPEAT','REPEAT');

        this.scene.right_text= new CGFappearance(this.scene);
        this.scene.right_text.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.right_text.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.right_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.right_text.setShininess(10.0);
        this.scene.right_text.loadTexture('images/mineTop.png');
        this.scene.right_text.setTextureWrap('REPEAT','REPEAT');

        this.scene.left_text= new CGFappearance(this.scene);
        this.scene.left_text.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.left_text.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.left_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.left_text.setShininess(10.0);
        this.scene.left_text.loadTexture('images/mineTop.png');
        this.scene.left_text.setTextureWrap('REPEAT','REPEAT');

        this.scene.back_text= new CGFappearance(this.scene);
        this.scene.back_text.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.back_text.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.back_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.back_text.setShininess(10.0);
        this.scene.back_text.loadTexture('images/mineTop.png');
        this.scene.back_text.setTextureWrap('REPEAT','REPEAT');

        this.scene.front_text= new CGFappearance(this.scene);
        this.scene.front_text.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.front_text.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.front_text.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.front_text.setShininess(10.0);
        this.scene.front_text.loadTexture('images/mineTop.png');
        this.scene.front_text.setTextureWrap('REPEAT','REPEAT');
    }

    display(){
        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        //this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.bottom_text.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.face_bot.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        //this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.top_text.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.face_top.display();
        this.scene.popMatrix();

        //left
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.left_text.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.face_left.display();
        this.scene.popMatrix();

        //right
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.right_text.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.face_right.display();

        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.back_text.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.face_back.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.front_text.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
        this.face_front.display();
        this.scene.popMatrix();
    }
   
}