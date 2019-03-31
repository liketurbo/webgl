import { getWebGLContext, initShaders } from '../common/lib/cuon-utils';
import err from '../common/utils/error';
import initVertexBuffers from './utils/init-vertex-buffers';

const vertexShader = require('./shaders/vertex.glsl');
const fragmentShader = require('./shaders/fragment.glsl');

(<any>window).start = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('example');

  if (!canvas) return err('frt');

  const gl = (<any>getWebGLContext)(canvas) as
    | WebGLRenderingContext & { program: WebGLProgram }
    | null;

  if (!gl) return err('cgc');

  if (!initShaders(gl, vertexShader, fragmentShader)) return err('fis');

  const n = initVertexBuffers(gl);
  if (n < 0) return err('fspv');

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  const uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  const uRotationMatrix = gl.getUniformLocation(gl.program, 'u_Rotation');
  const uTranslationMatrix = gl.getUniformLocation(gl.program, 'u_Translation');
  const uScalingMatrix = gl.getUniformLocation(gl.program, 'u_Scaling');

  if (
    aPosition < 0 ||
    !uFragColor ||
    !uRotationMatrix ||
    !uTranslationMatrix ||
    !uScalingMatrix
  )
    return err('fgst');

  gl.vertexAttrib3f(aPosition, 0, 0, 0);

  const angle = Math.PI / 2;
  const tX = 0.25,
    tY = 0.0,
    tZ = 0.0;
  const sX = 1.25,
    sY = 1.25,
    sZ = 1.25;

  /**
   * [
   *  [cos, sin, 0, 0]
   *  [-sin, cos, 0, 0]
   *  [0, 0, 1, 0]
   *  [0, 0, 0, 1]
   * ]
   */
  const rotationMatrix = new Float32Array([
    Math.cos(angle),
    Math.sin(angle),
    0.0,
    0.0,
    -Math.sin(angle),
    Math.cos(angle),
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0
  ]);

  /**
   * [
   *  [1, 0, 0, x]
   *  [0, 1, 0, y]
   *  [0, 0, 1, z]
   *  [0, 0, 0, 1]
   * ]
   */
  const translationMatrix = new Float32Array([
    1,
    0,
    0,
    tX,
    0,
    1,
    0,
    tY,
    0,
    0,
    1,
    tZ,
    0,
    0,
    0,
    1
  ]);

  /**
   * [
   *  [x, 0, 0, 0]
   *  [0, y, 0, 0]
   *  [0, 0, z, 0]
   *  [0, 0, 0, 1]
   * ]
   */
  const scalingMatrix = new Float32Array([
    sX,
    0,
    0,
    0,
    0,
    sY,
    0,
    0,
    0,
    0,
    sZ,
    0,
    0,
    0,
    0,
    1
  ]);

  gl.uniformMatrix4fv(uTranslationMatrix, false, translationMatrix);
  gl.uniformMatrix4fv(uRotationMatrix, false, rotationMatrix);
  gl.uniformMatrix4fv(uScalingMatrix, false, scalingMatrix);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);

  return 0;
};
