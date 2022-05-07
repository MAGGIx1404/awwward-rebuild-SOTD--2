varying vec2 vUv;
uniform sampler2D u_image;
void main () {
    gl_FragColor = texture2D(u_image, vUv);
}
