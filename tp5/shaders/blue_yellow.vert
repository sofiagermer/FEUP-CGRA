#ifdef GL_ES
precision highp float;
#endif

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform vec3 aVertexPosition;
uniform float normScale;
varying vec4 coords;
varying vec4 normal;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {
	vec3 offset=vec3(sin(timeFactor),0.0,0.0);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}