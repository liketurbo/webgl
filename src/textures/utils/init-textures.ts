import { WebGLContext } from '../../common/types/webgl';
import err from '../../common/utils/error';
import circleUrl from '../assets/circle.gif';
import skyUrl from '../assets/sky.jpg';

let texInit0 = false,
  texInit1 = false;

const loadTexture = (
  gl: WebGLContext,
  n: number,
  texture: WebGLTexture,
  uSampler: WebGLUniformLocation,
  image: TexImageSource,
  textUnit: number
) => {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis

  if (textUnit === 0) {
    // Enable texture unit0
    gl.activeTexture(gl.TEXTURE0);
    texInit0 = true;
  } else if (textUnit === 1) {
    gl.activeTexture(gl.TEXTURE1);
    texInit1 = true;
  }

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Set the texture unit 0 to the sampler
  gl.uniform1i(uSampler, textUnit);

  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>

  if (texInit0 && texInit1) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw a rectangle
  }
};

const initTextures = (gl: WebGLContext, n: number) => {
  const texture0 = gl.createTexture(); // Create a texture object
  const texture1 = gl.createTexture(); // Create a texture object
  if (!texture0 || !texture1) return err('fcto');

  // Get the storage location of u_Sampler
  const uSampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  const uSampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!uSampler0 || !uSampler1) return err('fgsl');

  const image0 = new Image(); // Create the image object
  const image1 = new Image();
  if (!image0 || !image1) return err('fcio');

  // Register the event handler to be called on loading an image
  image0.onload = () => {
    loadTexture(gl, n, texture0, uSampler0, image0, 0);
  };
  image1.onload = () => {
    loadTexture(gl, n, texture1, uSampler1, image1, 1);
  };
  // Tell the browser to load an image
  image0.src = skyUrl;
  image1.src = circleUrl;

  return true;
};

export default initTextures;
