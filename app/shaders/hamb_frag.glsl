    // vec3 color = rgbShift(uTexture, vUv, uOffset);


uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec2 uOffset;
varying vec2 vUv;

vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 offset ){
    float r = texture2D(textureimage, uv + offset).r;
    vec2 gb = texture2D(textureimage, uv).gb;
    return vec3(r, gb);
}

void main(){
    vec3 color = texture2D(uTexture, vUv).rgb;

    gl_FragColor = vec4(color, uAlpha);
}
