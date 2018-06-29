"use strict"; //helps to reduce errors

function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
}

function main() {
  var splashScreen = null;
  var startGameButton = null;
  var instructionsLink = null;
  var instructionsList = null;
  var gameOverScreen = null;
  var restartButton = null;
  var canvas;
  var container;
  var game = null;
  var canvasSize = {
    width: 900,
    height: 500
  };

  function buildSplashScreen() {
    container = document.getElementById("game-container");
    splashScreen = createHtml(`<div id="intro">
      <h1 class="main-title">GuacaGame</h1>
      <div class="start-over-game">
        <div class="contenido"><img class="guaca" src="images/welcome.png"/></div>
        <div class= "contenido">
          <button class="button">Start Game</button>
          <p class="how-to-play"><a class="link" href="#">How to play?</a></p>
          <ul class="instructions">
          <li>Move Linda up, down, right or left with the arrow keys!</li>
          <li>You just have one minute!</li>
          <li>Cages move fast, avoid them! If Linda gets caught 3 times, you lose!</li>
          <li>Mangos are delicious, eat them! The more Linda eats, the higher your score will be!</li>
          </ul>
        </div>
      </div>
    </div>
        
      </div>`);

    container.appendChild(splashScreen);
    startGameButton = splashScreen.querySelector("button");
    startGameButton.addEventListener("click", destroySplashScreen);


    instructionsLink = splashScreen.querySelector("a");
    instructionsLink.addEventListener("click", hideShowInstructions);

  }

  function hideShowInstructions() {
    instructionsList = splashScreen.querySelector("ul");
    instructionsList.classList.toggle('instructions');
  }

  function destroySplashScreen() {
    splashScreen.remove();
    buildGame();
  }

  function buildGame() {
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", canvasSize.width + "px");
    canvas.setAttribute("height", canvasSize.height + "px");
    container.appendChild(canvas);
    playGame();
  }


  //----- @todo---This should be in game.js

  function handleKeyUp(event) {
    var self = this;

    if (event.key === "ArrowUp") {
      game.player.moveUp();
    } else if (event.key === "ArrowDown") {
      game.player.moveDown();
    }
    else if (event.key === "ArrowRight") {
      game.player.moveRight();
    }
    else if (event.key === "ArrowLeft") {
      game.player.moveLeft();
    }
  }

  function playGame() {
    var canvasCtx = canvas.getContext("2d");
    game = new Game(canvasCtx, canvas, destroyGame);
    window.addEventListener("keyup", handleKeyUp);
    game.backgroundAudio.play();
  }

  function destroyGame(lost, score) {
    game.backgroundAudio.pause();
    game = null;
    canvas.remove();
    buildGameOver(lost, score);
    window.removeEventListener("keyup", handleKeyUp);
  }

  function buildGameOver(lost, score) {
    if (lost) {

      gameOverScreen = createHtml(`<div id="game-over">
      <h1 class="main-title">Game Over!</h1>
      <div class="start-over-game">
      <div class="contenido"><img class="guaca-over" src="images/lost.png"/></div>
      <div class ="contenido">
      <button class="button">Restart</button>
      </div>
      </div>
      </div>`);

      container.appendChild(gameOverScreen);
      restartButton = gameOverScreen.querySelector("button");
      restartButton.addEventListener("click", destroyGameOver);

    } else {

      gameOverScreen = createHtml(`<div id="game-over">
      <h1 class="main-title">Time is over!</h1>
      <div class="start-over-game">
      <div class="contenido"><img class="guaca-over" src="images/win.png"/></div>
      <div class ="contenido">
      <button class="button">Restart</button>
      <p>Linda ate `+ score + ` mangos!</p>
      </div>
      </div>
      </div>`);

      container.appendChild(gameOverScreen);
      restartButton = gameOverScreen.querySelector("button");
      restartButton.addEventListener("click", destroyGameOver);
    }
  }



  function destroyGameOver() {
    gameOverScreen.remove();
    buildSplashScreen();
  }

  buildSplashScreen();
}

window.addEventListener("load", main);
