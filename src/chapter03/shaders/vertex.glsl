attribute vec4 a_Position;
uniform vec4 u_Translation;
uniform float u_CosA, u_SinA;

void main() {
  gl_Position = a_Position + u_Translation;
  gl_Position.x = a_Position.x * u_CosA - a_Position.y * u_SinA;
  gl_Position.y = a_Position.x * u_SinA + a_Position.y * u_CosA;
}
