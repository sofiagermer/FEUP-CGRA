#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D sandTex;
uniform sampler2D sandMap;

void main() {
    vec4 color = texture2D(sandTex, vTextureCoord);

    vec4 map = texture2D(sandMap, vec2(0.0,0.1)+vTextureCoord);

    gl_FragColor = color * 0.8 + map * 0.2;
}