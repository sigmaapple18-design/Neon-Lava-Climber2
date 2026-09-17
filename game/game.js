
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let platforms = [];
let x;
let y;
let vx = 0;
let vy = 0;
let ground = false;
let jumpsLeft = 2;
let cameraY = 0;
let nextPlatformY = 0;
let lavaY = 0;
let gameOver = false;

const gravity = 0.78; // gravity acceleration
const playerW = 50;
const playerH = 50;

const platformWidth = 150;
const platformHeight = 15;
const platformSpeed = 0; // speed at which platforms move down
const lavaSpeed = 0.5; // speed at which lava rises
const spawnGap = 110; // vertical gap between platforms

function updateCamera() {
  const targetCameraY = y - canvas.height * 0.45;

  // Smoothly follow the player vertically
  cameraY += (targetCameraY - cameraY) * 0.1;
}

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

  const maxPlatforms = Math.ceil(canvas.height / spawnGap) + 1;

  for (let i = 0; i < maxPlatforms; i++) {
    spawnPlatform(canvas.height - i * spawnGap);
  }

  nextPlatformY = canvas.height - (maxPlatforms - 1) * spawnGap;
}

function generatePlatforms() {
  // Keep generating platforms above the camera
  while (nextPlatformY > cameraY - spawnGap) {
    nextPlatformY -= spawnGap;
    spawnPlatform(nextPlatformY);
  }
}

function updatePlayer() {
  x += vx;
  y += vy;

  // Warp to the opposite side of the screen
  if (x + playerW < 0) {
    x = canvas.width;
  } else if (x > canvas.width) {
    x = -playerW;
  }

  if (y + playerH > canvas.height) {
    y = canvas.height - playerH;
    vy = 0;
  }
}

function drawPlayer() {
  ctx.fillStyle = 'rgb(0, 255, 60)';
  ctx.fillRect(x, y - cameraY, playerW, playerH);
}

function update() {
  if (!ctx || !canvas) return;
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const previousY = y;

  vy += gravity;
  updatePlayer();

  for (const p of platforms) {
    p.y += platformSpeed;
  }

  lavaY -= lavaSpeed;

  collision(previousY);
    if (y + playerH >= lavaY) {
      gameOver = true;
      gameOverScreen();
    }

  updateCamera();
  generatePlatforms();

  const lavaScreenY = Math.min(lavaY - cameraY, canvas.height);
  const lavaGradient = ctx.createLinearGradient(0, lavaScreenY, 0, canvas.height);
  lavaGradient.addColorStop(0, 'rgb(255, 230, 70)');
  lavaGradient.addColorStop(0.08, 'rgb(255, 120, 0)');
  lavaGradient.addColorStop(0.45, 'rgb(220, 35, 0)');
  lavaGradient.addColorStop(1, 'rgb(75, 8, 0)');
  ctx.fillStyle = lavaGradient;
  ctx.fillRect(0, lavaScreenY, canvas.width, canvas.height - lavaScreenY);

  const surfaceGlow = ctx.createLinearGradient(0, lavaScreenY - 18, 0, lavaScreenY + 8);
  surfaceGlow.addColorStop(0, 'rgba(255, 80, 0, 0)');
  surfaceGlow.addColorStop(0.6, 'rgba(255, 150, 0, 0.35)');
  surfaceGlow.addColorStop(1, 'rgba(255, 235, 90, 0.9)');
  ctx.fillStyle = surfaceGlow;
  ctx.fillRect(0, lavaScreenY - 18, canvas.width, 26);

  for (const p of platforms) {
    const screenY = p.y - cameraY;

    if (screenY + p.height >= 0 && screenY <= canvas.height) {
      ctx.fillStyle = 'rgb(69, 69, 69)';
      ctx.fillRect(p.x, screenY, p.width, p.height);
    }
  }

  drawPlayer();
  requestAnimationFrame(update);
}

function collision(previousY) {
  ground = false;

  if (y + playerH >= canvas.height) {
    y = canvas.height - playerH;
    vy = 0;
    ground = true;
    jumpsLeft = 2;
    return;
  }

  if (vy < 0) return;

  for (const p of platforms) {
    const overlapsHorizontally =
      x < p.x + p.width && x + playerW > p.x;

    const playerBottom = y + playerH;
    const previousBottom = previousY + playerH;

    const landedOnPlatform =
      previousBottom <= p.y && playerBottom >= p.y;

    const standingOnPlatform =
      playerBottom >= p.y &&
      playerBottom <= p.y + p.height + 2;

    if (
      overlapsHorizontally &&
      (landedOnPlatform || standingOnPlatform)
    ) {
      y = p.y - playerH;
      vy = 0;
      ground = true;
      jumpsLeft = 2;
      return;
    }
  }
}
    
function gameOverScreen() {
  ctx.fillStyle = 'rgb(0, 255, 76)';
  ctx.font = '48px Arial';
  ctx.fillText('Climb Failed', canvas.width / 2 - 140, canvas.height / 2);
}

function startGame() {
  // make sure canvas is sized before initializing things
  resizeCanvas();

  // initialize player position ONCE here
  x = canvas.width / 2 - playerW / 2;
  y = canvas.height - 150;
  lavaY = canvas.height + 100;
  vx = 0;
  vy = 0;
  jumpsLeft = 2;
  gameOver = false;

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
