import { WebGLContext } from '../../common/types/webgl';
import err from '../../common/utils/error';
import { colors, indices, normals, vertices } from '../assets/matrices';
import initArrayBuffer from './init-array-buffer';

const initBuffers = (gl: WebGLContext) => {
  // Write the vertex coordinates and color to the buffer object
  if (!initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position'))
    return err('fiab');

  // prettier-ignore
  if (!initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color')) 
    return err('fiab');

  // prettier-ignore
  if (!initArrayBuffer(gl, normals, 3, gl.FLOAT, 'a_Normal')) 
    return err('fiab');

  // prettier-ignore
  if (!initArrayBuffer(gl, indices, 3, gl.FLOAT)) 
    return err('fiab');

  return indices.length;
};

export default initBuffers;
