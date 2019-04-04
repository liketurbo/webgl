import { getWebGLContext, initShaders } from '../common/lib/cuon-utils';
import { WebGLContext } from '../common/types/webgl';
import err from '../common/utils/error';
import click from './listeners/mouse';

const vertexShader = require('./shaders/vertex.glsl');
const fragmentShader = require('./shaders/fragment.glsl');

(<any>window).start = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('example');

  if (!canvas) return err('frt');

  const gl = (<any>getWebGLContext)(canvas) as WebGLContext;

  if (!gl) return err('cgc');

  if (!initShaders(gl, vertexShader, fragmentShader)) return err('fis');

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  const uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

  if (aPosition < 0 || aPointSize < 0 || !uFragColor) return err('fgsl');

  gl.vertexAttrib3f(aPosition, 0, 0, 0);
  gl.vertexAttrib1f(aPointSize, 10.0);

  canvas.onmousedown = e => {
    click(e, gl, canvas, aPosition, uFragColor);
  };

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return 0;
};
