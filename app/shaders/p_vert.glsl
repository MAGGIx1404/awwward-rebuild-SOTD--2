uniform float u_time;
void main() {
    vec3 p = position;
    p.y += 0.25*(sin(p.y * 5.0 + u_time) * 0.5 + 0.5);
    p.z += 0.05*(sin(p.y * 10.0 + u_time) * 0.5 + 0.5);
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 10.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
