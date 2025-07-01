const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let player = {
  x: 50,
  y: canvas.height - 60,
  width: 40,
  height: 40,
  color: "cyan",
  dy: 0,
  gravity: 0.8,
  jumpPower: -12,
  grounded: true
};

let obstacles = [];
let frames = 0;
let gameSpeed = 4;
let score = 0;
let gameOver = false;

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function spawnObstacle() {
  const height = Math.random() * 30 + 20;
  obstacles.push({
    x: canvas.width,
    y: canvas.height - height,
    width: 20,
    height: height,
    color: "red"
  });
}

function drawObstacles() {
  for (let obs of obstacles) {
    ctx.fillStyle = obs.color;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    obs.x -= gameSpeed;
  }

  // Remove off-screen obstacles
  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function handlePlayerPhysics() {
  player.y += player.dy;
  player.dy += player.gravity;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.grounded = true;
  }
}

function detectCollision() {
  for (let obs of obstacles) {
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      gameOver = true;
    }
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px sans-serif";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function update() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
    ctx.font = "20px sans-serif";
    ctx.fillText("Refresh to restart", canvas.width / 2 - 70, canvas.height / 2 + 30);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  handlePlayerPhysics();

  if (frames % 90 === 0) {
    spawnObstacle();
  }

  drawObstacles();
  detectCollision();
  drawScore();

  score++;
  frames++;
  requestAnimationFrame(update);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    if (player.grounded) {
      player.dy = player.jumpPower;
      player.grounded = false;
    }
  }
});

update();
