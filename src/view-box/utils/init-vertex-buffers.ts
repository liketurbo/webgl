import { WebGLContext } from '../../common/types/webgl';
import err from '../../common/utils/error';

const initVertexBuffers = (gl: WebGLContext) => {
  // prettier-ignore
  const verticesColors = new Float32Array([
  // vertex coordinates and color
    0.0, 0.5, -0.4, 0.4, 1.0, 0.4, // The back green triangle
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // The middle yellow triangle
    -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
    0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0, // The front blue triangle
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
    0.5, -0.5, 0.0, 1.0, 0.4, 0.4,
  ]);
  var n = 9;
  var s = verticesColors.BYTES_PER_ELEMENT;

  // Create a buffer object
  const vertexColorBuffer = gl.createBuffer();
  if (!vertexColorBuffer) return err('fcbo');

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  // Assign the buffer object to a_Position and enable the assignment
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  if (aPosition < 0) return err('fgsl', 'a_Position');

  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, s * 6, 0);
  gl.enableVertexAttribArray(aPosition);

  // Assign the buffer object to a_Color and enable the assignment
  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
  if (aColor < 0) return err('fgsl', 'a_Color');

  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, s * 6, s * 3);
  gl.enableVertexAttribArray(aColor);

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
};

export default initVertexBuffers;
