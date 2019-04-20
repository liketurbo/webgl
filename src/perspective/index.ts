import { Matrix4 } from '../common/lib/cuon-matrix';
import { getWebGLContext, initShaders } from '../common/lib/cuon-utils';
import { WebGLContext } from '../common/types/webgl';
import err from '../common/utils/error';
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

  const uProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  if (!uProjMatrix) return err('fgsl', 'u_ProjMatrix');

  const uModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!uModelMatrix) return err('fgsl', 'u_ModelMatrix');

  const modelMatrix = new Matrix4();
  modelMatrix.setTranslate(0.75, 0, 0);
  gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix.elements);

  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
  // Set the eye point, look-at point, and up direction

  // Pass the view matrix to u_ViewMatrix variable
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  const projMatrix = new Matrix4();
  projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);
  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);

  modelMatrix.setTranslate(-0.75, 0, 0);
  gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix.elements);
  // Draw a triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);

  return 0;
};
