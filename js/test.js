const TARGET_ROUNDS = 5;

let sequence = ["circle", "circle", "triangle", "square", "triangle"];
let playerSequence = [];

function nextRound() {

    playerSequence = [];

    const buttons = [
        "circle",
        "triangle",
        "square"
    ];

    const randomButton =
        buttons[
            Math.floor(
                Math.random() * buttons.length
            )
        ];

    sequence.push(randomButton);

    playSequence();
}

function playSequence() {

    let i = 0;

    const interval = setInterval(() => {

        document.getElementById("message")
            .textContent =
            sequence[i];

        i++;

        if(i >= sequence.length) {

            clearInterval(interval);

            document.getElementById("message")
                .textContent =
                "Jij bent aan de beurt!";
        }

    }, 1000);
}

document
  .getElementById("circle")
  .addEventListener("click", () => {

      playerInput("circle");
  });

document
  .getElementById("triangle")
  .addEventListener("click", () => {

      playerInput("triangle");
  });

document
  .getElementById("square")
  .addEventListener("click", () => {

      playerInput("square");
  });

function playerInput(button) {

    playerSequence.push(button);

    const currentIndex =
        playerSequence.length - 1;

    if(
      playerSequence[currentIndex]
      !== sequence[currentIndex]
    ) {

        loseGame();
        return;
    }

    if(
      playerSequence.length
      === sequence.length
    ) {

        setTimeout(nextRound, 1000);
    }
}

if(sequence.length >= TARGET_ROUNDS){

    winGame();
}

function loseGame() {

    document
      .getElementById("message")
      .textContent =
      "Verkeerde knop!";
}

function winGame(){

    document
      .getElementById("message")
      .textContent =
      "De taart is klaar!";
}

document
  .querySelector("#flora")
  .addEventListener("click", () => {

      playerInput("circle");
  });