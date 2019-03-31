attribute vec4 a_Position;
uniform mat4 u_Rotation;
uniform mat4 u_Translation;
uniform mat4 u_Scaling;

void main() {
  gl_Position = ((u_Rotation * a_Position) * u_Translation) * u_Scaling;
}
