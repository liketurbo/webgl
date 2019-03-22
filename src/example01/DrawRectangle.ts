interface Window {
  start: () => number;
}

window.start = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('example');

  if (!canvas) {
    console.log('Failed retrieve canvas');
    return 1;
  }

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.log('Cannot get context');
    return 2;
  }

  ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
  ctx.fillRect(120, 10, 150, 150);

  return 0;
};
