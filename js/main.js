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
  var canvasSize = {
    width: 900,
    height: 500
  };

  function buildSplashScreen() {
    container = document.getElementById("game-container");
    splashScreen = createHtml(`<div id="intro">
      <h1 class="main-title">GuacaGame</h1>
      <div class="start-over-game">
        <div class="contenido"><img class="guaca" src="../images/welcome.png"/></div>
        <div class= "contenido">
          <button class="button">Start Game</button>
          <p><a href="">Instrucciones</a></p>
          <ul class="instructions">
          <li>Move Linda up, down, right or left with the arrow keys!</li>
          <li>Cages move fast, avoid them! If you get caught 3 times, you will end up in someone's house.</li>
          <li>Mangos are so delicious, eat them! The more you eat within one minute, the better score you get.</li>
          </ul>
        </div>
      </div>
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
  }

  function destroyGame() {
    game = null;
    canvas.remove();
    buildGameOver();
  }

  function buildGameOver() {
    gameOverScreen = createHtml(`<div id="game-over">
        <h1 class="main-title">Game Over</h1>
        <div class="start-over-game">
        <div class="contenido"><img class="guaca-over" src="../images/lost.png"/></div>
        <div class ="contenido">
        <button class="button">Restart</button>
        </div>
        </div>
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
