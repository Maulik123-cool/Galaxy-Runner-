const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Full screen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 0;

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "40px sans-serif";
  ctx.fillText("🚀 Galaxy Runner", x, 100);

  x += 2;
  if (x > canvas.width) x = -300;

  requestAnimationFrame(draw);
}

draw();
