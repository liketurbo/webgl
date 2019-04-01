import { Matrix4 } from '../common/lib/cuon-matrix';
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

  const angle = 0;
  const tX = 0.0,
    tY = 0.0,
    tZ = 0.0;
  const sX = 1.25,
    sY = 1.25,
    sZ = 1.25;

  const rotationMatrix = new Matrix4().setRotate(angle, 0, 0, 1);
  const translationMatrix = new Matrix4().setTranslate(tX, tY, tZ);
  const scalingMatrix = new Matrix4().setScale(sX, sY, sZ);

  gl.vertexAttrib3f(aPosition, 0, 0, 0);
  gl.uniformMatrix4fv(uTranslationMatrix, false, translationMatrix.elements);
  gl.uniformMatrix4fv(uRotationMatrix, false, rotationMatrix.elements);
  gl.uniformMatrix4fv(uScalingMatrix, false, scalingMatrix.elements);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);

  return 0;
};
