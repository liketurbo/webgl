import { WebGLContext } from '../../common/types/webgl';
import err from '../../common/utils/error';

const initArrayBuffer = (
  gl: WebGLContext,
  data: Float32Array | Uint8Array,
  num: number,
  type: number,
  attribute?: string
) => {
  const buffer = gl.createBuffer(); // Create a buffer object
  if (!buffer) return err('fcbo');

  // Write date into the buffer object
  gl.bindBuffer(attribute ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(
    attribute ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER,
    data,
    gl.STATIC_DRAW
  );

  if (attribute) {
    // Assign the buffer object to the attribute variable
    const aAttribute = gl.getAttribLocation(gl.program, attribute);
    if (aAttribute < 0) return err('fgsl', attribute);

    gl.vertexAttribPointer(aAttribute, num, type, false, 0, 0);
    // Enable the assignment of the buffer object to the attribute variable
    gl.enableVertexAttribArray(aAttribute);
  }

  return true;
};

export default initArrayBuffer;
