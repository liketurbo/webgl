import { Matrix4 } from '../common/lib/cuon-matrix';
import { getWebGLContext, initShaders } from '../common/lib/cuon-utils';
import { WebGLContext } from '../common/types/webgl';
import err from '../common/utils/error';
import initVertexBuffers from './initializators/init-buffers';

const vertexShader = require('./shaders/vertex.glsl');
const fragmentShader = require('./shaders/fragment.glsl');

(<any>window).start = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('example');
  if (!canvas) return err('frt');
  const gl = (<any>getWebGLContext)(canvas) as WebGLContext;
  if (!gl) return err('cgc');
  const init = initShaders(gl, vertexShader, fragmentShader);
  if (!init) return err('fis');

  const n = initVertexBuffers(gl);
  if (n < 0) return err('fspv');

  const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  if (!uMvpMatrix) return err('fgsl', 'u_MvpMatrix');

  // Set the eye point and the viewing volume
  const mvpMatrix = new Matrix4();
  mvpMatrix.setPerspective(30, 1, 1, 100);
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

  // Clear the color and depth buffer
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw the cube
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

  return 0;
};
