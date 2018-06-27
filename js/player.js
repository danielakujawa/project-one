"use strict";

function Player(ctx) {
  this.ctx = ctx;
  this.position = {
    x: 30,
    y: 20
  };

  this.size = {
    width: 60,
    height: 60
  };
  this.lives = 3;
  this.speed = 60; //it will move 15px every frame
}

Player.prototype.draw = function () {
  var self = this;
  // var img = new Image();
  // img.src = '../images/fly.gif';
  // img.onload = function () {
  //   self.ctx.drawImage(img, 20, 20);
  self.ctx.fillStyle = "red";
  self.ctx.fillRect(
    self.position.x,
    self.position.y,
    self.size.width,
    self.size.height
  );
};

// Player.prototype.drawLives = function() {
//   var self = this;
//   self.ctx.fillStyle = "blue";
//   self.ctx.font = "30px Verdana";
//   self.ctx.fillText(self.lives, 10, 10);
// };

Player.prototype.moveUp = function () {
  var self = this;
  self.position.y -= self.speed;
};

Player.prototype.moveDown = function () {
  var self = this;
  self.position.y += self.speed;
};

Player.prototype.moveRight = function () {
  var self = this;
  self.position.x += self.speed;
};

Player.prototype.moveLeft = function () {
  var self = this;
  self.position.x -= self.speed;
};