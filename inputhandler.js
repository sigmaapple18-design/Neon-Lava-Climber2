// robust keyboard handling for WASD + arrow keys
const keys = {};

addEventListener('keydown', (e) => {
  // ignore repeated keydown auto-repeat if you like:
  // if (e.repeat) return;

  keys[e.code] = true;

  // prevent arrow keys from scrolling the page
  if (e.code.startsWith('Arrow')) e.preventDefault();

  updateVelocityFromKeys();
});

addEventListener('keyup', (e) => {
  delete keys[e.code];
  updateVelocityFromKeys();
});

function updateVelocityFromKeys() {
  // reset
  vx = 0;
  vy = 0;

  // horizontal
  if (keys['KeyD'] || keys['ArrowRight']) vx = 5;
  if (keys['KeyA'] || keys['ArrowLeft']) vx = -5;

  // vertical
  if (keys['KeyW'] || keys['ArrowUp']) vy = -5;
  if (keys['KeyS'] || keys['ArrowDown']) vy = 5;
}
