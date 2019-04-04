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

  if (aPosition < 0 || !uFragColor) return err('fgst');
  gl.vertexAttrib3f(aPosition, 0, 0, 0);
  gl.uniform4f(uFragColor, 1.0, 0.0, 0.0, 1);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, n);

  return 0;
};
