import { Matrix4 } from '../common/lib/cuon-matrix';
import { getWebGLContext, initShaders } from '../common/lib/cuon-utils';
import { WebGLContext } from '../common/types/webgl';
import err from '../common/utils/error';
import keydown from './listeners/keyboard';
import initVertexBuffers from './utils/init-vertex-buffers';

const vertexShader = require('./shaders/vertex.glsl');
const fragmentShader = require('./shaders/fragment.glsl');

(<any>window).start = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('example');

  if (!canvas) return err('frt');

  const gl = (<any>getWebGLContext)(canvas) as WebGLContext;

  if (!gl) return err('cgc');

  if (!initShaders(gl, vertexShader, fragmentShader)) return err('fis');

  const n = initVertexBuffers(gl);
  if (n < 0) return err('fspv');

  // Get the storage location of u_ViewMatrix variable
  const uViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!uViewMatrix) return err('fgsl', 'u_ViewMatrix');

  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0.2, 0.25, 0.25, 0, 0, 0, 0, 1, 0).rotate(-10, 0, 0, 1);
  // Set the eye point, look-at point, and up direction

  // Pass the view matrix to u_ViewMatrix variable
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  document.onkeydown = e => {
    keydown(e, gl, n, uViewMatrix, viewMatrix);
  };

  // Draw a triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
  return 0;
};
