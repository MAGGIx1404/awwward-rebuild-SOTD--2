varying vec2 vUv;
uniform vec2 u_resolution;
uniform vec2 u_image_sizes;
uniform vec2 u_plane_sizes;
uniform sampler2D u_image;
uniform float u_time;
uniform vec2 hover;
uniform float hoverState;
float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
    uv -= disc_center;
    uv*=u_resolution;
    float dist = sqrt(dot(uv, uv));
    return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}
void main() {
  vec2 newUV = vUv;
  vec2 ratio = vec2(
    min((u_plane_sizes.x / u_plane_sizes.y) / (u_image_sizes.x / u_image_sizes.y), 1.0),
    min((u_plane_sizes.y / u_plane_sizes.x) / (u_image_sizes.y / u_image_sizes.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * (ratio.x) + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
float c = circle(vUv, hover, 0.0, hoverState);
float r = texture2D(u_image, newUV.xy += c * (0.1 * .5)).x;
float g = texture2D(u_image, newUV.xy += c * (0.1 * .525)).y;
float b = texture2D(u_image, newUV.xy += c * (0.1 * .55)).z;
vec4 color = vec4(r, g, b, 1.);
//gl_FragColor.rgb = texture2D(u_image, uv).rgb;
//gl_FragColor.a = 1.0;
gl_FragColor = color;
}
