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
  this.start();
}

Game.prototype.start = function() {
  var self = this;
  self.player = new Player(self.ctx);
  //createElements();
  self.elements = new Elements(self.ctx, self.size);

  // setInterval(function() {
  //   var x = new Elements(self.ctx, self.size);
  //   self.elements.push(x);
  // }, 2000);

  self.doFrame();
};

// function createElements() {
//   for (var i = 0; i < 10; i++) {
//     self.elements.push(new Elements(self.ctx, self.size));
//   }
// }

// Game.prototype.checkIfEnded = function () {
//   var self = this;
//   if (self.player.lives <= 0) {
//     this.isEnded = true;
//     this.callback();
//   }
// }

// Game.prototype.checkCollisions = function () {
//   var self = this;
//   if (self.ball.position.y <= 0) {
//     self.ball.speed.y = -self.ball.speed.y
//   }
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

Game.prototype.clearCanvas = function() {
  var self = this;
  self.ctx.clearRect(0, 0, self.size.width, self.size.height);
};

Game.prototype.draw = function() {
  var self = this;
  self.player.draw();
  self.elements.draw();
};

Game.prototype.update = function() {
  var self = this;
  self.elements.move();
};

Game.prototype.doFrame = function() {
  var self = this; //change everything to self in the methods
  // self.checkIfEnded();
  // self.checkCollisions();
  self.clearCanvas();
  self.update();
  self.draw();
  window.requestAnimationFrame(function() {
    //   if(!self.isEnded){
    self.doFrame();
    //   }
    // else if (self.isEnded) {
    //   self.callback();
    //   // }
  });
};
