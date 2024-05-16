console.log("Shooting Stars");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rezise Screen and Canvas
window.addEventListener("resize", (event) => {
  init();
});

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
init();
