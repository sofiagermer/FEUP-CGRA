#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D sandTex;
uniform sampler2D sandMap;

void main() {
    vec4 color = texture2D(sandTex, vTextureCoord);

    vec4 map = texture2D(sandMap, vec2(0.0,0.1)+vTextureCoord);

    //codigo do mike apagar
    map = map * 0.2;
    if(color.r > map.r) color.r -= map.r;
    else color.r = 0.0;
    if(color.g > map.g) color.g -= map.g;
    else color.g = 0.0;
    if(color.b > map.b) color.b -= map.b;
    else color.b = 0.0;

	gl_FragColor = color;

    //gl_FragColor = color * 0.8 + map * 0.2;
}