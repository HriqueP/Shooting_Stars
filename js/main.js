console.log("Shooting Stars");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Global Variables and Constants
const groundColor = "#11171e";
const starColor = "#f7fcfd";
const mountainColors = ["#374652", "#2a3542", "#202a35"];

// Classes Definitions
class Ground {
  constructor(color) {
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, canvas.height - 100, canvas.width, canvas.height);
  }
}
class Mountain {
  constructor(colors) {
    this.colors = colors;
  }

  draw() {
    // Back
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 100);
    ctx.lineTo(canvas.width, canvas.height - 100);
    ctx.lineTo(canvas.width / 2, canvas.height - (canvas.height - 120));
    ctx.lineTo(0, canvas.height - 100);
    ctx.fillStyle = this.colors[0];
    ctx.fill();
    ctx.closePath();

    // Middle
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 100);
    ctx.lineTo(canvas.width / 2, canvas.height - 100);
    ctx.lineTo(canvas.width / 4, canvas.height / 2 - 120);
    ctx.lineTo(0, canvas.height - 100);
    ctx.fillStyle = this.colors[1];
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - 100);
    ctx.lineTo(canvas.width, canvas.height - 100);
    ctx.lineTo(canvas.width / 2 + canvas.width / 4, canvas.height / 2 - 120);
    ctx.lineTo(canvas.width / 2, canvas.height - 100);
    ctx.fillStyle = this.colors[1];
    ctx.fill();
    ctx.closePath();

    // Front
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 100);
    ctx.lineTo(canvas.width / 3, canvas.height - 100);
    ctx.lineTo(canvas.width / 6, canvas.height / 2 + 120);
    ctx.lineTo(0, canvas.height - 100);
    ctx.fillStyle = this.colors[2];
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 3, canvas.height - 100);
    ctx.lineTo(canvas.width / 3 + canvas.width / 3, canvas.height - 100);
    ctx.lineTo(canvas.width / 3 + canvas.width / 6, canvas.height / 2 + 120);
    ctx.lineTo(canvas.width / 3, canvas.height - 100);
    ctx.fillStyle = this.colors[2];
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 3 + canvas.width / 3, canvas.height - 100);
    ctx.lineTo(canvas.width, canvas.height - 100);
    ctx.lineTo(canvas.width / 3 + canvas.width / 2, canvas.height / 2 + 120);
    ctx.lineTo(canvas.width / 3 + canvas.width / 3, canvas.height - 100);
    ctx.fillStyle = this.colors[2];
    ctx.fill();
    ctx.closePath();
  }
}
class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.closePath();
  }
}
class shootingStar {}

// Classes Objects Declarations
const ground = new Ground(groundColor);
const mountain = new Mountain(mountainColors);
const star = new Star(20, 20, 4, starColor);

// Function Animate Frames Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mountain.draw();
  ground.draw();
  star.draw();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Resize Screen and Canvas
window.addEventListener("resize", (event) => {
  init();
});
function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
init();
