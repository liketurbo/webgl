const gPoints: [number, number][] = []; // The array for a mouse press
const gColors: [number, number, number, number][] = []; // The array to store the color of a point

const click = (
  event: MouseEvent,
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  aPosition: number,
  uFragColor: WebGLUniformLocation
) => {
  var x = event.clientX; // x coordinate of a mouse pointer on viewport
  var y = event.clientY; // y coordinate of a mouse pointer on viewport
  var rect = canvas.getBoundingClientRect(); // coords of the canvas on viewport

  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = -(y - rect.top - canvas.height / 2) / (canvas.height / 2); // cause it works from top to bottom

  // Store the coordinates to g_points array
  gPoints.push([x, y]);

  if (x >= 0.0 && y >= 0.0) {
    // First quadrant
    gColors.push([1.0, 0.0, 0.0, 1.0]); // Red
  } else if (x < 0.0 && y < 0.0) {
    // Third quadrant
    gColors.push([0.0, 1.0, 0.0, 1.0]); // Green
  } else {
    // Others
    gColors.push([1.0, 1.0, 1.0, 1.0]); // White
  }

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < gPoints.length; i++) {
    const xy = gPoints[i];
    const rgba = gColors[i];

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(aPosition, xy[0], xy[1], 0);

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(uFragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // Draw a point
    gl.drawArrays(gl.POINTS, 0, 1);
  }
};

export default click;
