varying vec2 vUv;
varying vec3 v_color;
varying vec3 v_normal;
void main() {
    vec3 light = vec3(0.0);
    vec3 skyColor = vec3(1.000, 1.000, 0.547);
    vec3 groundColor = vec3(0.562, 0.275, 0.111);
    vec3 lightDirection = normalize(vec3(0.0, -1.0, -1.0));
    light += dot(lightDirection, v_normal);
    light = mix(skyColor, groundColor, dot(lightDirection, v_normal));
    gl_FragColor = vec4(light * v_color, 1.0);
  }
