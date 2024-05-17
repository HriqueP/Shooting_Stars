console.log("Shooting Stars");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Global Variables and Constants
const groundColor = "#11171e";
const starColor = "#f7fcfd";
const mountainColors = ["#374652", "#2a3542", "#202a35"];
const gravity = 0.6;
const friction = 0.6;

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
class ShootingStar {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
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

  update() {
    this.draw();

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius + this.dx < 0
    ) {
      this.dx = -this.dx * friction;
    }

    if (this.y + this.radius + this.dy > canvas.height - 100) {
      this.dy = -this.dy * friction;
      if (this.radius < 2) {
        shootingStars.shift();
      } else {
        this.radius /= 2;
        for (let i = 0; i < 5; i++) {
          shootingStars.push(
            new ShootingStar(
              this.x,
              this.y,
              randomNumber(-5, 5),
              this.dy + randomNumber(-5, 5),
              this.radius,
              this.color
            )
          );
        }
      }
    } else {
      this.dy += gravity;
    }

    this.y += this.dy;
    this.x += this.dx;
  }
}

// Classes Objects Declarations
const ground = new Ground(groundColor);
const mountain = new Mountain(mountainColors);
let stars = [];
let shootingStars = [];
setInterval(() => {
  let x = Math.random() * canvas.width;
  let dx = Math.random() < 0.5 ? -5 : 5;
  shootingStars.push(new ShootingStar(x, 0, dx, 10, 6, starColor));
}, 1000);

// Function Animate Frames Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
  mountain.draw();
  ground.draw();
  for (let i = 0; i < shootingStars.length; i++) {
    shootingStars[i].update();
  }
  // shootingStar.update();
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

  shootingStars = [];
  stars = [];
  for (let i = 0; i < 120; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height - 300;
    let radius = Math.random() * 4 + 1;

    stars.push(new Star(x, y, radius, starColor));
  }
}
init();

// Function Random Number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
