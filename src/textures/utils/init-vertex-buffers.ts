import { WebGLContext } from '../../common/types/webgl';
import err from '../../common/utils/error';

const initVertexBuffers = (gl: WebGLContext) => {
  const n = 3;
  const verticesSizesColors = new Float32Array([
    0.0,
    0.5,
    10.0,
    1.0,
    0.0,
    0.0, // 1st vertex
    -0.5,
    -0.5,
    20.0,
    0.0,
    1.0,
    0.0, // 2nd vertex
    0.5,
    -0.5,
    30.0,
    0.0,
    0.0,
    1.0 // 3rd vertex
  ]);

  // Create a buffer object
  const vertexSizeColorBuffer = gl.createBuffer();
  if (!vertexSizeColorBuffer) return err('fcbo');

  // Write vertex coordinates to the buffer object and enable it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizesColors, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  if (aPosition < 0) return err('fgsl', 'a_Position');

  gl.vertexAttribPointer(
    aPosition,
    2,
    gl.FLOAT,
    false,
    verticesSizesColors.BYTES_PER_ELEMENT * 6,
    0
  );
  gl.enableVertexAttribArray(aPosition);

  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (aPointSize < 0) return err('fgsl', 'a_PointSize');

  gl.vertexAttribPointer(
    aPointSize,
    1,
    gl.FLOAT,
    false,
    verticesSizesColors.BYTES_PER_ELEMENT * 6,
    verticesSizesColors.BYTES_PER_ELEMENT * 2
  );
  gl.enableVertexAttribArray(aPointSize);

  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(
    aColor,
    3,
    gl.FLOAT,
    false,
    verticesSizesColors.BYTES_PER_ELEMENT * 6,
    verticesSizesColors.BYTES_PER_ELEMENT * 3
  );
  gl.enableVertexAttribArray(aColor); // Enable buffer allocation

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
};

export default initVertexBuffers;
