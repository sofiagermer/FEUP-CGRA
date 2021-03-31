#ifdef GL_ES
precision highp float;
#endif

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform sampler2D uSampler2;

varying vec4 coords;
varying vec4 normal;

uniform float timeFactor;
uniform float normScale;

void main() {
    vec3 offset=vec3(normScale*0.1*sin(timeFactor),0.0,0.0);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
    coords = gl_Position;
}