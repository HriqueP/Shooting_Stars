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
class ShootingStar {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.gravity = 0.5;
    this.friction = 0.54;
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
      this.dx = -this.dx * this.friction;
    }

    if (this.y + this.radius + this.dy > canvas.height - 100) {
      this.dy = -this.dy * this.friction;
      this.radius -= 3;

      this.createParticles();
    } else {
      this.dy += this.gravity;
    }

    this.y += this.dy;
    this.x += this.dx;
  }

  createParticles() {
    for (let i = 0; i < 5; i++) {
      if (this.radius < 0) {
        this.radius = 0;
      }
      particles.push(new Particle(this.x, this.y, this.radius, this.color));
    }
  }
}
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = randomNumber(-5, 5);
    this.dy = randomNumber(-15, 15);
    this.radius = radius;
    this.color = color;
    this.gravity = 0.25;
    this.friction = 0.6;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
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
      this.dx = -this.dx * this.friction;
    }

    if (this.y + this.radius + this.dy > canvas.height - 100) {
      this.dy = -this.dy * this.friction;
      this.radius -= 1;
    } else {
      this.dy += this.gravity;
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
// shootingStars.push(
//   new ShootingStar(
//     canvas.width / 2, // x
//     -10, // y
//     0, // dx
//     randomNumber(10, 15), // dy
//     10, // radius
//     starColor // color
//   )
// );
setInterval(() => {
  shootingStars.push(
    new ShootingStar(
      Math.random() * canvas.width, // x
      -10, // y
      0, // dx
      randomNumber(10, 15), // dy
      randomNumber(5, 10), // radius
      starColor // color
    )
  );
}, 350);
let particles = [];

// Function Animate Frames Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
  mountain.draw();
  ground.draw();
  shootingStars.forEach((value, index) => {
    shootingStars[index].update();
    if (shootingStars[index].radius <= 0) {
      shootingStars.splice(index, 1);
    }
  });
  particles.forEach((value, index) => {
    particles[index].update();
    if (particles[index].radius <= 0) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
window.addEventListener("resize", (event) => {
  init();
});

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars = [];
  for (let i = 0; i < 100; i++) {
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
