import { getWebGLContext, initShaders } from './lib/cuon-utils';

// Vertex shader program
const VSHADER_SOURCE = `void main() {
   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
   gl_PointSize = 10.0;
  }`;

// Fragment shader program
const FSHADER_SOURCE = `void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }`;

(<any>window).start = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('example');

  if (!canvas) {
    console.log('Failed retrieve canvas');
    return 1;
  }

  const gl = (<any>getWebGLContext)(canvas);

  if (!gl) {
    console.log('Cannot get context');
    return 2;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return 3;
  }

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);

  return 0;
};
