const berry = document.querySelector("#berry");
const basket = document.querySelector("#basket");
const scoreText = document.getElementById("score");
const startButton = document.getElementById("start");

let berryX = 0;
let berryY = 3;

let basketX = 0;

let score = 0;

let gameRunning = false;
let berryWaiting = false;

// Start button
startButton.addEventListener("click", startBerryGame);
    
window.addEventListener("load", () => {

    console.log("Page loaded");
    
    // debugging :')
    console.log(berry);
    console.log(basket);

});



// Move basket
document.addEventListener("keydown", event => {

    if (!gameRunning) return;

    if (event.key === "ArrowLeft") {

        basketX -= 0.5;

    }

    if (event.key === "ArrowRight") {

        basketX += 0.5;

    }

    basketX = Math.max(
        -6,
        Math.min(6, basketX)
    );

    basket.object3D.position.x = basketX;
    basket.object3D.position.z = -3;
});

function startBerryGame() {
    document.getElementById("ui").style.display = "block";
    // Prevent multiple starts
    if (gameRunning) {
        return;
    }

    score = 0;
    scoreText.textContent = score;

    gameRunning = true;

    spawnBerry();

    requestAnimationFrame(gameLoop);
}

function spawnBerry() {

    const spawnMin = -3;
    const spawnMax = 3;

    berryX = spawnMin + Math.random() * (spawnMax - spawnMin);

    berryY = 3;

    berryWaiting = true;

    berry.setAttribute(
    "animation",
    {
        property: "rotation",
        from: "0 0 -10",
        to: "0 0 10",
        dur: 300,
        dir: "alternate",
        loop: true
    }
);

    berry.object3D.position.set(
        berryX,
        berryY,
        0
    );

    setTimeout(() => {

        berryWaiting = false;
        berry.removeAttribute("animation");

    }, 2000);
}

function gameLoop() {

    if (!gameRunning) {
        return;
    }

    if (!berryWaiting) {
    berryY -= 0.03;
    }

    berry.object3D.position.set(berryX, berryY, -3);

    checkCatch();

    // Missed berry
    if (berryY < -4) {
    spawnBerry();
    }

    requestAnimationFrame(gameLoop);
}

function checkCatch() {

    const dx = Math.abs(
        berry.object3D.position.x -
        basket.object3D.position.x
    );

    const dy = Math.abs(
        berry.object3D.position.y -
        basket.object3D.position.y
    );

    if (
        dx < 0.8 &&
        dy < 0.5
    ) {

        score++;

        scoreText.textContent = score;

        spawnBerry();
    }
}