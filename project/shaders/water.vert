#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D waterTex;
uniform sampler2D waterMap;

uniform float normScale;

void main() {
    
    vec4 color = texture2D(waterMap, aTextureCoord);

    gl_Position = uPMatrix * (uMVMatrix * vec4(aVertexPosition , 1.0) + vec4(0.0,color.r, 0.0,1.0));
    vTextureCoord = aTextureCoord;
}
