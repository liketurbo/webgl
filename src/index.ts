import { getWebGLContext, initShaders } from './lib/cuon-utils';

const vertexShader = require('./shaders/vertex.glsl');
const fragmentShader = require('./shaders/fragment.glsl');

(<any>window).start = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('example');

  if (!canvas) {
    console.log('Failed retrieve canvas');
    return 1;
  }

  const gl = (<any>getWebGLContext)(canvas) as WebGLRenderingContext | null;

  if (!gl) {
    console.log('Cannot get context');
    return 2;
  }

  if (!initShaders(gl, vertexShader, fragmentShader)) {
    console.log('Failed to initialize shaders');
    return 3;
  }

  const aPosition = gl.getAttribLocation((<any>gl).program, 'a_Position');
  const aPointSize = gl.getAttribLocation((<any>gl).program, 'a_PointSize');
  if (aPosition < 0 || aPointSize < 0) {
    console.log(
      'Fail to get the storage location of a_Position or a_PointSize'
    );
    return 4;
  }

  gl.vertexAttrib3f(aPosition, 0, 0, 0);
  gl.vertexAttrib1f(aPointSize, 10.0);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);

  return 0;
};
