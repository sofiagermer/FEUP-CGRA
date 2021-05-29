#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

varying vec4 coords;
varying vec3 headColor;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform float ratio;

void main() {

    if (coords.x <= -ratio)
        gl_FragColor = vec4(headColor[0], headColor[1], headColor[2], 0.6);
    else
        gl_FragColor = texture2D(uSampler, vTextureCoord);
}

