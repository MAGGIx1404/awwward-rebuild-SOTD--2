varying vec2 vUv;
uniform float u_time;
void main () {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.z += sin(uv.x + u_time) * 0.1;
    newPosition.y += sin(uv.x + u_time) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
