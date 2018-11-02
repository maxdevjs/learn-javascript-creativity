const canvas = document.getElementById('animation');
const ctx = canvas.getContext('2d');

const width = 50;
const height = 50;
let startX = 10;
let startY = 10;
let x = startX;
let y = startY;
let duration = 0;
// const endX = canvas.width - width;
let endX;
let endY;
// endX = canvas.width - 50;
const lerp = (start, end, speed) => start + (end - start) * speed;

const logic = evt => {
  let max = canvas.width - width;
  let maxY = canvas.height - height;
  duration += 0.02;
  let l = lerp(startX, endX, duration);
  let ll = lerp(startY, endY, duration);
  // x = lerp(startX, endX, duration);
  if (l < max && l > 0 && endX !== x && (ll < maxY && ll > 0 && endY !== y)) {
    x = l;
    y = ll;
    requestAnimationFrame(draw);
  } else {
    duration = 0;
  }
};

const draw = () => {
  //https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00FF00';
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(x, y, width, height);
};

canvas.addEventListener('mousemove', evt => {
  startX = x;
  endX = evt.clientX;
  startY = y;
  endY = evt.clientY;
});

requestAnimationFrame(draw);
setInterval(logic, 1000 / 60);
