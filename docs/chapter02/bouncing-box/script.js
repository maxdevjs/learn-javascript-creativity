const canvas = document.getElementById('animation');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const width = 50;
const height = 50;
let startX = 10;
let startY = 10;
let x = startX;
let y = startY;
let duration = 0;
// const endX = canvas.width - width;
// let endX;
// let endY;
let heading_x = (heading_y = Math.random() * 360);
let distance_x = (distance_y = 0);

const lerp = (start, end, speed) => start + (end - start) * speed;

const logic = evt => {
  if (heading_x > 360 || heading_x < -360) heading_x = 0;
  if (heading_y > 360 || heading_y < -360) heading_y = 0;
  if (x <= 0 || x >= canvas.width - width) heading_x = heading_x + 180;
  if (y <= 0 || y > canvas.height - height) heading_y = -heading_y;
  distance_x = dir_x(2, heading_x);
  distance_y = dir_y(2, heading_y);

  if (duration < 10) {
    duration += 0.05;
  } else {
    duration = 0;
  }
  x = lerp(x, x + distance_x, duration);
  y = lerp(y, y + distance_y, duration);

  requestAnimationFrame(draw);
};

const draw = () => {
  ctx.fillStyle = '#00FF00';
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(x, y, width, height);
};

// canvas.addEventListener('mousemove', evt => {
//   startX = x;
//   endX = evt.clientX;
//   startY = y;
//   endY = evt.clientY;
// });

const degreesToRadians = degrees => degrees * (Math.PI / 180);

const dir_x = (length, angle) => length * Math.cos(degreesToRadians(angle));

const dir_y = (length, angle) => length * Math.sin(degreesToRadians(angle));

requestAnimationFrame(draw);
setInterval(logic, 1000 / 60);
