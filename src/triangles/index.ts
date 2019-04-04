import { Matrix4 } from '../common/lib/cuon-matrix';
import { getWebGLContext, initShaders } from '../common/lib/cuon-utils';
import { CMatrix, WebGLContext } from '../common/types/webgl';
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

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  const uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  const uModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');

  if (aPosition < 0 || !uFragColor || !uModelMatrix) return err('fgsl');

  // Current rotation angle of a triangle
  let currentAngle = 0.0;
  // Matrix4 object for model transformation
  const modelMatrix = new Matrix4();

  const tick = function() {
    draw(
      gl,
      n,
      (currentAngle = animate(currentAngle)),
      modelMatrix,
      uModelMatrix
    );
    requestAnimationFrame(tick); // Request that the browser calls tick
  };
  tick();

  gl.clearColor(0, 0, 0, 1);
  gl.vertexAttrib3f(aPosition, 0, 0, 0);
  gl.uniform4f(uFragColor, 1.0, 0.0, 0.0, 1);

  return 0;
};

const draw = (
  gl: WebGLContext,
  n: number,
  currentAngle: number,
  modelMatrix: CMatrix,
  u_ModelMatrix: WebGLUniformLocation
) => {
  // Set up rotation matrix
  modelMatrix.setRotate(currentAngle, 0, 0, 1);
  modelMatrix.translate(0.35, 0, 0);

  // Pass the rotation matrix to the vertex shader
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
};

// Last time when this function was called
let last = Date.now();
const animate = (angle: number) => {
  // Degree per second
  const angleStep = 45.0;

  // Calculate the elapsed time
  let now = Date.now();
  const elapsed = now - last; // milliseconds
  last = now;

  // Update the current rotation angle (adjusted by the elapsed time)
  const newAngle = angle + (angleStep * elapsed) / 500.0;
  return newAngle % 360;
};
