interface Window {
  start: () => number;
}

window.start = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('example');

  if (!canvas) {
    console.log('Failed retrieve canvas');
    return 1;
  }

  const gl = canvas.getContext('webgl');

  if (!gl) {
    console.log('Cannot get context');
    return 2;
  }

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return 0;
};
