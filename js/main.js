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
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = groundColor;
    ctx.fillRect(0, canvas.height - 100, canvas.width, canvas.height);
  }
}
class Mountain {}
class shootingStar {}
class star {}

// Classes Objects Declarations
const ground = new Ground();

// Function Animate Frames Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ground.draw();
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
