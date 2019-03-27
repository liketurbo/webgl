const gPoints: number[][] = []; // The array for a mouse press

const click = (
  event: MouseEvent,
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  aPosition: number
) => {
  var x = event.clientX; // x coordinate of a mouse pointer on viewport
  var y = event.clientY; // y coordinate of a mouse pointer on viewport
  var rect = canvas.getBoundingClientRect(); // coords of a canvas on viewport

  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = -(y - rect.top - canvas.height / 2) / (canvas.height / 2);

  // Store the coordinates to g_points array
  gPoints.push([x, y]);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < gPoints.length; i++) {
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(aPosition, gPoints[i][0], gPoints[i][1], 0);

    // Draw a point
    gl.drawArrays(gl.POINTS, 0, 1);
  }
};

export default click;
