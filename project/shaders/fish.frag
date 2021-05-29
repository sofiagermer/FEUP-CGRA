#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

varying vec2 vTextureCoord;
varying vec4 light;

uniform sampler2D uSampler;
uniform float ratio;
uniform vec4 body_color;
uniform float r;
uniform float g;
uniform float b;

void main() {
	if (coords.x >= -0.3) { 
        vec4 color = texture2D(uSampler, vTextureCoord);
		gl_FragColor =  color * light;
    }
	else {
		vec4 color = vec4(r, g, b, 1.0);
		gl_FragColor =  color * light;
	}
}
