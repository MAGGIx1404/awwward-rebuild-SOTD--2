varying vec2 vUv;
uniform float u_time;
uniform float hoverState;
uniform vec2 hover;
uniform float u_delta;
void main() {
vUv = uv;
vec3 newPos = position;
float dist = distance(uv, hover);
newPos.z += hoverState * sin(dist*2.0 + u_time);
gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
