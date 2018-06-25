"use strict"; //helps to reduce errors

function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
}

function main() {
  var splashScreen = null;
  var startGameButton = null;
  var gameOverScreen = null;
  var restartButton = null;
  var canvas;
  var container;
  var game = null;

  function buildSplashScreen() {
    container = document.getElementById("game-container");
    splashScreen = createHtml(`<div id="intro">
        <h1>Game Name</h1>
        <img src="../images/welcome.png"/>
        <div class ="button-div"><button>Start Game</button></div>
        <div id="instructions">
          <p>Move the Guacamaya up and down to avoid the cages.</p>
          <p>If you get caught 3 times, you lose</p>
        </div>
      </div>`);

    container.appendChild(splashScreen);
    startGameButton = splashScreen.querySelector("button");
    startGameButton.addEventListener("click", destroySplashScreen);
  }

  function destroySplashScreen() {
    splashScreen.remove();
    buildGame();
  }

  function buildGame() {
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    container.appendChild(canvas);
    playGame();
  }

  function playGame() {
    var canvasCtx = canvas.getContext("2d");
    game = new Game(canvasCtx, canvas, destroyGame);
    //window.addEventListener("keyup", handleKeyUp);
    var gameTest = setTimeout(function() {
      destroyGame();
    }, 3000);
  }

  function destroyGame() {
    canvas.remove();
    buildGameOver();
  }

  function buildGameOver() {
    gameOverScreen = createHtml(`<div id="game-over">
        <h1>Game Over</h1>
        <img src="../images/lost.png"/>
        <div class ="button-div"><button>Restart</button></div>
      </div>`);

    container.appendChild(gameOverScreen);
    restartButton = gameOverScreen.querySelector("button");
    restartButton.addEventListener("click", destroyGameOver);
  }

  function destroyGameOver() {
    gameOverScreen.remove();
    buildSplashScreen();
  }

  buildSplashScreen();
}

window.addEventListener("load", main);
