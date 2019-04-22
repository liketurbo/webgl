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

  const uModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!uModelMatrix) return err('fgsl', 'u_ModelMatrix');

  let modelMatrix = new Matrix4();
  modelMatrix.setTranslate(0.75, 0, 0);

  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);

  const projMatrix = new Matrix4();
  projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniformMatrix4fv(
    uModelMatrix,
    false,
    new Matrix4()
      .set(projMatrix)!
      .multiply(viewMatrix)
      .multiply(modelMatrix).elements
  );

  // Draw a triangles
  gl.drawArrays(gl.TRIANGLES, 0, n);

  modelMatrix.setTranslate(-0.75, 0, 0);
  gl.uniformMatrix4fv(
    uModelMatrix,
    false,
    new Matrix4()
      .set(projMatrix)!
      .multiply(viewMatrix)
      .multiply(modelMatrix).elements
  );

  // Draw a triangles
  gl.drawArrays(gl.TRIANGLES, 0, n);

  return 0;
};
