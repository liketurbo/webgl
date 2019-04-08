import { WebGLContext } from '../../common/types/webgl';
import err from '../../common/utils/error';

const initVertexBuffers = (gl: WebGLContext) => {
  // prettier-ignore
  const verticesTexCoords = new Float32Array([
    // Vertex coordinates, texture coordinate
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
     0.5, 0.5, 1.0, 1.0,
     0.5, -0.5, 1.0, 0.0,
  ]);
  const n = 4; // The number of vertices
  const s = verticesTexCoords.BYTES_PER_ELEMENT;

  // Create the buffer object
  const vertexTexCoordBuffer = gl.createBuffer();
  if (!vertexTexCoordBuffer) return err('fcbo');

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

  //Get the storage location of a_Position, assign and enable buffer
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  if (aPosition < 0) return err('fgsl', 'a_Position');

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, s * 4, 0);
  gl.enableVertexAttribArray(aPosition); // Enable the assignment of the buffer object

  // Get the storage location of a_TexCoord
  var aTexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if (aTexCoord < 0) return err('fgsl', 'a_TexCoord');

  // Assign the buffer object to a_TexCoord variable
  gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, s * 4, s * 2);
  gl.enableVertexAttribArray(aTexCoord); // Enable the assignment of the buffer object

  return n;
};

export default initVertexBuffers;
