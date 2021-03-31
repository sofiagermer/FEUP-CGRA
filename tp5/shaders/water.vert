#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexNormal;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform sampler2D texturewaterMap;
uniform float timeFactor;
uniform float normScale;

varying vec2 vTextureCoord;

void main(){
    vec4 color = texture2D(texturewaterMap, vTextureCoord+vec2(timeFactor*0.01, 0.0));

    color *= vec4(0.0, sin(timeFactor), 0.0, 0.0);

    float height = color.y*normScale;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0) + vec4(0.0, height, 0.0, 0.0);

    vTextureCoord = aTextureCoord;
}