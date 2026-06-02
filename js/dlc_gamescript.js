const scene = document.querySelector("a-scene");
const cylinder = document.createElement("a-cylinder");
cylinder.setAttribute("color", "#FBFF00");
cylinder.setAttribute("height", "2");
cylinder.setAttribute("radius", "0.75");
cylinder.setAttribute("position", "3 1 0");
scene.appendChild(cylinder);

const gameState = {
  creaturesDefeated: 0,

  level1: {
    berriesCollected: 0,
    completed: false
  },

  level2: {
    cakeComplete: false,
    waterComplete: false,
    completed: false
  },

  level3: {
    bridgeCleared: false,
    spinningWheelsDestroyed: 0,
    completed: false
  }
};

const sequence = ["a", "w", "d"];
let playerInput = [];

function pressButton(button){

    playerInput.push(button);

    const current =
      playerInput.length - 1;

    if(playerInput[current] !== sequence[current]){
        failRound();
        return;
    }

    if(playerInput.length === sequence.length){
        nextRound();
    }
}