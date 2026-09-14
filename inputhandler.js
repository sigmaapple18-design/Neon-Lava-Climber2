// robust keyboard handling for WASD + arrow keys
const keys = {};

addEventListener('keydown', (e) => {
  if (e.code.startsWith('Arrow')) e.preventDefault();

  keys[e.code] = true;

  if (
    !e.repeat &&
    (e.code === 'KeyW' || e.code === 'ArrowUp') &&
    jumpsLeft > 0
  ) {
    vy = -16;
    jumpsLeft--;
  }

  updateVelocityFromKeys();
});

addEventListener('keyup', (e) => {
  keys[e.code] = false;
  updateVelocityFromKeys();
});

function updateVelocityFromKeys() {
  vx = 0;

  if (keys['KeyD'] || keys['ArrowRight']) {
    vx = 5;
  } else if (keys['KeyA'] || keys['ArrowLeft']) {
    vx = -5;
  }
}
