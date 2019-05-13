attribute vec4 a_Color;
varying vec4 v_Color;

attribute vec4 a_Position;
uniform mat4 u_MvpMatrix;

attribute vec4 a_Normal;
uniform vec3 u_LightColor;
uniform vec3 u_LightDirection;

void main() {
  gl_Position = u_MvpMatrix * a_Position;

  // Make the length of the normal 1.0
  vec3 normal = normalize(vec3(a_Normal));
  // Dot product of light direction and orientation of a surface
  float nDotL = max(dot(u_LightDirection, normal), 0.0);
  // Calculate the color due to diffuse reflection
  vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;

  v_Color = vec4(diffuse, a_Color.a);
}