import { CMatrix, WebGLContext } from '../../common/types/webgl';

let gEyeX = 0.2,
  gEyeY = 0.25,
  gEyeZ = 0.25; // The eye point
const draw = (
  gl: WebGLContext,
  n: number,
  uViewMatrix: WebGLUniformLocation,
  viewMatrix: CMatrix
) => {
  // Set the eye point and line of sight
  viewMatrix.setLookAt(gEyeX, gEyeY, gEyeZ, 0, 0, 0, 0, 1, 0);

  // Pass the view matrix to the uViewMatrix variable
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>

  gl.drawArrays(gl.TRIANGLES, 0, n); // Draw a triangle
};

const keydown = (
  e: KeyboardEvent,
  gl: WebGLContext,
  n: number,
  uViewMatrix: WebGLUniformLocation,
  viewMatrix: CMatrix
) => {
  if (e.keyCode == 39) {
    // The right arrow key was pressed
    gEyeX += 0.01;
  } else if (e.keyCode == 37) {
    // The left arrow key was pressed
    gEyeX -= 0.01;
  } else {
    return;
  } // Present unnecessary drawing
  draw(gl, n, uViewMatrix, viewMatrix);
};

export default keydown;
