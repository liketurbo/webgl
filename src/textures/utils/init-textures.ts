import { WebGLContext } from '../../common/types/webgl';
import err from '../../common/utils/error';
import imageUrl from '../assets/sky.jpg';

const loadTexture = (
  gl: WebGLContext,
  n: number,
  texture: WebGLTexture,
  uSampler: WebGLUniformLocation,
  image: TexImageSource
) => {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Set the texture unit 0 to the sampler
  gl.uniform1i(uSampler, 0);

  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
};

const initTextures = (gl: WebGLContext, n: number) => {
  const texture = gl.createTexture(); // Create a texture object
  if (!texture) return err('fcto');

  // Get the storage location of u_Sampler
  const uSampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!uSampler) return err('fgsl', 'u_Sampler');

  const image = new Image(); // Create the image object
  if (!image) return err('fcio');

  // Register the event handler to be called on loading an image
  image.onload = () => {
    loadTexture(gl, n, texture, uSampler, image);
  };
  // Tell the browser to load an image
  image.src = imageUrl;
  return true;
};

export default initTextures;
