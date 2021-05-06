#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D sandTex;
uniform sampler2D sandMap;

void main() {
    vec4 color = texture2D(sandTex, vTextureCoord);

    vec4 map = texture2D(sandMap, vTextureCoord);

    gl_FragColor = color * map;
}
