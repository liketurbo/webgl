import { WebGLContext } from '../../common/types/webgl';
import err from '../../common/utils/error';

const initVertexBuffers = (gl: WebGLContext) => {
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const n = 3;

  const sizes = new Float32Array([
    10.0,
    20.0,
    30.0 // Point sizes
  ]);

  // Create a buffer object
  const vertexBuffer = gl.createBuffer();
  const sizeBuffer = gl.createBuffer();
  if (!vertexBuffer || !sizeBuffer) return err('fcbo');

  // Write vertex coordinates to the buffer object and enable it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (aPointSize < 0 || aPosition < 0) return err('fgsl');

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  // Bind the point size buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPointSize);

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
};

export default initVertexBuffers;
