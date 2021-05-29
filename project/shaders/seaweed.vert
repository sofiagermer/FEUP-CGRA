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
    vTextureCoord = aTextureCoord;

    vec3 offset = vec3(0.0,0.0,0.0);
    vec3 vertexPosition = aVertexPosition;
    
    offset = vec3(sin(timeFactor*(5.0) + 2.0*(aVertexPosition.z) )*0.1,0.0, 0.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);  
}
