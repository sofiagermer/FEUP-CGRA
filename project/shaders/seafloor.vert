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

uniform sampler2D sandTex;
uniform sampler2D sandMap;

uniform float normScale;

void main() {

    vec2 newATextureCoord  = aTextureCoord;
    
    vec4 color = texture2D(sandMap, newATextureCoord);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + vec3(0.0 ,0.0, (color.r) * .1) , 1.0);
    vTextureCoord = newATextureCoord;
}