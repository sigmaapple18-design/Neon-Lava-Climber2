
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let platforms = [];
let x;
let y;
let vx = 0;
let vy = 0;

const playerW = 50;
const playerH = 50;

const platformWidth = 150;
const platformHeight = 15;
const platformSpeed = 2;
const spawnGap = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

function spawnPlatform(yPosition) {
  const randomX = Math.random() * (canvas.width - platformWidth);
  platforms.push({
    x: randomX,
    y: yPosition,
    width: platformWidth,
    height: platformHeight
  });
}

function initPlatforms() {
  platforms = [];
  // spawn enough platforms to fill the screen
  const maxPlatforms = Math.ceil(canvas.height / spawnGap) + 1;
  for (let i = 0; i < maxPlatforms; i++) {
    spawnPlatform(canvas.height - (i * spawnGap));
  }
}

function updatePlayer() {
  // simple position update; expand with gravity/collisions as needed
  x += vx;
  y += vy;

  // keep player inside canvas horizontally
  if (x < 0) x = 0;
  if (x + playerW > canvas.width) x = canvas.width - playerW;

  // optional floor clamp
  if (y + playerH > canvas.height) {
    y = canvas.height - playerH;
    vy = 0;
  }
}

function drawPlayer() {
  ctx.fillStyle = 'rgb(30, 255, 68)';
  ctx.fillRect(x, y, playerW, playerH);
}

function update() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move and draw platforms
  for (let i = 0; i < platforms.length; i++) {
    const p = platforms[i];
    p.y += platformSpeed;

    ctx.fillStyle = 'rgb(69, 69, 69)';
    ctx.fillRect(p.x, p.y, p.width, p.height);

    if (p.y > canvas.height) {
      p.y = -platformHeight;
      p.x = Math.random() * (canvas.width - platformWidth);
    }
  }

  // update & draw player every frame
  updatePlayer();
  drawPlayer();

  requestAnimationFrame(update);
}

function startGame() {
  // make sure canvas is sized before initializing things
  resizeCanvas();

  // initialize player position ONCE here
  x = canvas.width / 2 - playerW / 2;
  y = canvas.height - 150;
  vx = 0;
  vy = 0;

  initPlatforms();
  requestAnimationFrame(update);
}

// If you trigger startGame via a custom event, call it:
window.addEventListener('startGame', () => {
  // example guard: only start if canvas is visible
  if (!canvas.classList.contains('hidden')) {
    startGame();
  }
});

// Or just call startGame() to begin immediately
// startGame();
