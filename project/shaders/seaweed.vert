#ifdef GL_ES
precision highp float;
#endif

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
    vertexPosition.xz += sin(timeFactor * vertexPosition.y * phaseFactor) * vertexPosition.y;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
}
