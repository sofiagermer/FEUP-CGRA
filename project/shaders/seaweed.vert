#ifdef GL_ES
precision highp float;
#endif


varying vec2 vTextureCoord;
attribute vec2 aTextureCoord;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec4 coords;
varying vec4 normal;


uniform float phaseFactor;

void main() {

    vec3 vertexPosition = aVertexPosition;
    coords = vec4(aVertexPosition + aVertexNormal * 0.1, 1.0);

    vec3 offset1 = vec3(1.0, 0.0, 1.0);
    vec3 offset2 = vec3(1.0, 0.0, 1.0);

    vTextureCoord = aTextureCoord;

    offset1 *= 0.3 * sin(timeFactor);
    offset2 *= 0.3 * sin(-timeFactor);
    
    //entre -1 e 0.5
    if(coords.y < 0.3) 
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset2, 1.0);
    else if(coords.y >0.1 && coords.y < 2.9)
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset1, 1.0);
    else
        gl_Position =  uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);


  
}
/*
varying vec2 vTextureCoord;
attribute vec2 aTextureCoord;

attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float timeFactor;
uniform float phaseFactor;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 vertexPosition = aVertexPosition;
    vertexPosition.xz +=  sin(timeFactor * vertexPosition.y * 0.1) * vertexPosition.y;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
}
*/