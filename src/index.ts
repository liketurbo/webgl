import { getWebGLContext, initShaders } from './lib/cuon-utils';
import click from './listeners/mouse';
import err from './utils/error';

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

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  var uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

  if (aPosition < 0 || aPointSize < 0)
    return err('fgst', 'a_Position', 'a_PointSize');

  gl.vertexAttrib3f(aPosition, 0, 0, 0);
  gl.vertexAttrib1f(aPointSize, 10.0);

  canvas.onmousedown = e => {
    click(e, gl, canvas, aPosition, uFragColor!);
  };

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return 0;
};
