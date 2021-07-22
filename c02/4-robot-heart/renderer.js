const { ipcRenderer } = require('electron');

const canvas = document.getElementById('robotHeart');
const context = canvas.getContext("2d");
canvas.width = window.innerWidth - 30
canvas.height = window.innerHeight - 30

canvas.draw = function (x, y) {
  let radius = 2;

  context.fillStyle = '#ff0000';
  context.beginPath();
  context.moveTo(x, y);
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fill();
};

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

// 把每个点连接起来
async function draw(x, y) {
  // console.debug(x, y)
  await sleep(10)
  ipcRenderer.send('robot-move', x + 400, y + 300)
}

setTimeout(() => {

  let n = 120;
  let beta = 1 / n;
  let a = 50
  let c = Math.cos(beta)
  let s = Math.sin(beta)
  let c1 = c * c - s * s
  let s1 = 2 * c * s
  let x10 = a, x20 = a / 2, y10 = 0, y20 = 0
  let x = 2 * a, y = 0
  let x1 = x, y1 = y

  draw(x1, y1)

  for (let i = 0; i <= n * 10; i++) {
    let x_10 = c * x10 - s * y10
    let y_10 = c * y10 + s * x10
    let x_20 = c1 * x20 - s1 * y20
    let y_20 = c1 * y20 + s1 * x20
    x10 = x_10; y10 = y_10;
    x20 = x_20; y20 = y_20;
    x = x10 + x20 + a / 2.0
    y = y10 + y20;
    x1 = x + 0.5; y1 = y + 0.5;
    draw(x1, y1)
  }

}, 2000)

ipcRenderer.on('robot-draw', (e, x, y) => {
  // console.debug('robot', x, y)

  canvas.draw(x, y)
})
