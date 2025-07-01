const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let keys = {};

const player = {
  x: 100,
  y: canvas.height / 2,
  width: 40,
  height: 40,
  speed: 5,
  color: '#00f2ff',
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update() {
    if (keys['ArrowUp']) this.y -= this.speed;
    if (keys['ArrowDown']) this.y += this.speed;
    this.y = Math.max(0, Math.min(this.y, canvas.height - this.height));
  }
};

class Obstacle {
  constructor() {
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - 100);
    this.width = 30;
    this.height = Math.random() * 100 + 30;
    this.speed = 6;
    this.color = '#ff0055';
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.x -= this.speed;
    this.draw();
  }
}

let obstacles = [];
let frame = 0;
function spawnObstacle() {
  if (frame % 60 === 0) obstacles.push(new Obstacle());
}

function updateScore() {
  score++;
  document.getElementById('score').innerText = `Score: ${score}`;
}

function detectCollision(player, obs) {
  return (
    player.x < obs.x + obs.width &&
    player.x + player.width > obs.x &&
    player.y < obs.y + obs.height &&
    player.y + player.height > obs.y
  );
}

function gameOver() {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '48px sans-serif';
  ctx.fillText('Game Over!', canvas.width / 2 - 120, canvas.height / 2);
  cancelAnimationFrame(animationId);
}

let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  player.draw();

  spawnObstacle();
  obstacles.forEach((obs, index) => {
    obs.update();
    if (obs.x + obs.width < 0) {
      obstacles.splice(index, 1);
      updateScore();
    }
    if (detectCollision(player, obs)) {
      gameOver();
    }
  });

  frame++;
}

animate();

window.addEventListener('keydown', e => {
  keys[e.key] = true;
});
window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
