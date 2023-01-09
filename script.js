const delay = (delayInMs) => {
  return new Promise((resolve) => setTimeout(resolve, delayInMs));
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

// Variable
let STATE = "RUN";

// DOM Element
const character = document.getElementById("character");
const obstacles = document.getElementById("obstacles");

async function jump() {
  if (STATE === "JUMP") return;

  character.classList.remove("run");
  character.classList.add("jump");
  STATE = "JUMP";

  await delay(3000);

  STATE = "RUN";
  character.classList.remove("jump");
  character.classList.add("run");
}

function generateObstacle() {}

// Events
window.addEventListener("keydown", (e) => e.code === "Space" && jump());
window.addEventListener("click", jump);
window.addEventListener("touchstart", jump);

setInterval(() => {
  if (random(0, 50) === 0) {
    console.log("create");
    const newObstacle = document.createElement("div");
    newObstacle.className = `obstacle ${random(1, 2) === 1 ? "one" : "two"}`;
    obstacles.appendChild(newObstacle);
  }

  document.querySelectorAll(".obstacle").forEach((obstacle) => {
    console.log(obstacle);
    if (elementsOverlap(character, obstacle)) {
      alert("You died!!");
      window.location.reload();
      return;
    }
  });
}, 100);
