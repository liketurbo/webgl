import round from 'lodash/round';

import { CMatrix, WebGLContext } from '../../common/types/webgl';

const draw = (
  gl: WebGLContext,
  n: number,
  uProjMatrix: WebGLUniformLocation,
  projMatrix: CMatrix,
  nf: HTMLElement
) => {
  // Set the viewing volume using a matrix
  projMatrix.setOrtho(-1, 1, -1, 1, gNear, gFar);

  // Set the projection matrix to uProjMatrix variable
  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>

  // Display the current near and far values
  nf.innerHTML = `near: ${round(gNear, 2)}, far: ${round(gFar, 2)}`;

  gl.drawArrays(gl.TRIANGLES, 0, n); // Draw the triangles
};

let gNear = 0.0,
  gFar = 0.5;
const keydown = (
  e: KeyboardEvent,
  gl: WebGLContext,
  n: number,
  uProjMatrix: WebGLUniformLocation,
  projMatrix: CMatrix,
  nf: HTMLElement
) => {
  switch (e.keyCode) {
    case 39:
      gNear += 0.01;
      break; // The right arrow key was pressed
    case 37:
      gNear -= 0.01;
      break; // The left arrow key was pressed
    case 38:
      gFar += 0.01;
      break; // The up arrow key was pressed
    case 40:
      gFar -= 0.01;
      break; // The down arrow key was pressed
    default:
      return; // Prevent the unnecessary drawing
  }

  draw(gl, n, uProjMatrix, projMatrix, nf);
};

export default keydown;
