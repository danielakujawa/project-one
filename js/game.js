"use strict";

function Game(ctx, canvas, cb) {
  this.ctx = ctx;
  this.size = {
    width: canvas.width,
    height: canvas.height
  };
  this.player = null;
  this.elements = [];
  this.callback = cb;
  this.isEnded = false;
  this.counter = 0;
  this.start();
}

Game.prototype.start = function () {
  var self = this;
  self.player = new Player(self.ctx);

  // self.createElement();

  self.doFrame();
};

// Game.prototype.createElement = function() {
//   for (var ix = 0; ix < 6; ix++) {
//     var self = this;

//     var newElement = new Element(self.ctx, self.size, self.position);
//     self.elements.push(newElement);
//   }
// };

Game.prototype.createElement = function () {
  var self = this;
  if (self.elements.length < 5) {
    var newElement = new Element(self.ctx, self.size, self.position);
    self.elements.push(newElement);
    console.log(self.elements.length);
  }
};

// Game.prototype.checkIfEnded = function () {
//   var self = this;
//   if (self.player.lives <= 0) {
//     this.isEnded = true;
//     this.callback();
//   }
// }

// Game.prototype.checkCollisions = function () {
//   var self = this;

//   var elementsData = {
//     x: self.elements.position.x,
//     y: self.elements.position.y,
//     width: self.elements.size.width,
//     height: self.elements.size.height,

//   };
//   s
//   var playerData = {
//     x: self.player.position.x,
//     y: self.player.position.y,
//     width: self.player.size.width,
//     height: self.player.size.height,
//   }

//   if (elementsData.x < playerData.x + playerData.width &&
//     elementsData.x + elementsData.width > playerData.x &&
//     elementsData.y < playerData.y + playerData.height &&
//     elementsData.height + elementsData.y > playerData.y) {
//   }
// }
//   var self = this;
//   if (self.player.position.y <= 0) {
//     self.player.speed.y = - self.player.speed.y
//   }
// }
//   else if (self.ball.position.y + self.ball.size.height >= self.size.height) {
//     self.ball.speed.y = -self.ball.speed.y
//   }
//   else if (self.ball.position.x <= 0 ) {
//     self.player.lives --;
//     self.ball.speed.x = -self.ball.speed.x
//     self.ball = new Ball(self.ctx, self.size);
//   }
//   else if (self.ball.position.x + self.ball.size.width >= self.size.width) {
//     self.ball.speed.x = -self.ball.speed.x
//   }
// }

Game.prototype.clearCanvas = function () {
  var self = this;
  self.ctx.clearRect(0, 0, self.size.width, self.size.height);
};

Game.prototype.draw = function () {
  var self = this;
  self.player.draw();
  self.elements.forEach(function (element) {
    element.draw();
  });
};

Game.prototype.update = function () {
  var self = this;
  self.elements.forEach(function (element) {
    element.move();
  });
};

Game.prototype.checkElementsOffScreen = function () {
  var self = this;
  self.elements.forEach(function (element) {
    if (element.position.x < -60) {
      element.position.x = 960;
      element.position.y = Math.floor(Math.random() * 440);
    }
  });
};

// Game.prototype.checkPlayerCanvasCollision = function () {
//   var self = this;
//   if (handleKeyUp && player.position.y > self.size.height - player.size.height) {
//     player.position += 7;
//   }
//   else if (leftPressed && paddleX > 0) {
//     paddleX -= 7;
//   }

// }

Game.prototype.doFrame = function () {
  var self = this; //change everything to self in the methods
  self.counter++;
  // self.checkIfEnded();
  //self.checkCollisions();
  self.checkElementsOffScreen();
  self.clearCanvas();
  self.update();
  self.draw();

  if (self.counter === 100) {
    self.createElement();
    self.counter = 0;
  }

  self.elements.forEach(function (item) {
    item.draw();
    item.move();
  });

  window.requestAnimationFrame(function () {
    //   if(!self.isEnded){
    self.doFrame();
    //   }
    // else if (self.isEnded) {
    //   self.callback();
    //   // }
  });
};
