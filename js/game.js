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

Game.prototype.checkCollisions = function () {
  var self = this;

  if (self.player.position.y <= 0) {
    self.player.position.y += 4;
  }
  else if (self.player.position.y + self.player.size.height >= self.size.height) {
    self.player.position.y -= 4;
  }
}


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


Game.prototype.doFrame = function () {
  var self = this; //change everything to self in the methods
  self.counter++;
  // self.checkIfEnded();
  self.checkCollisions();
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
