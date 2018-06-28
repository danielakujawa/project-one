"use strict";

function Player(ctx) {
  this.ctx = ctx;
  this.position = {
    x: 30,
    y: 60
  };

  this.size = {
    width: 60,
    height: 60
  };
  this.lives = 3;
  this.speed = 60;

  this.image = new Image();
  this.image.src = "../images/parrot-fly-wing-up.png";
}

Player.prototype.draw = function () {
  var self = this;
  self.ctx.drawImage(self.image, self.position.x, self.position.y, self.size.width, self.size.height)

  // self.ctx.fillStyle = "red";
  // self.ctx.fillRect(
  //   self.position.x,
  //   self.position.y,
  //   self.size.width,
  //   self.size.height
  // );
};

Player.prototype.drawLives = function () {
  var self = this;
  self.ctx.fillStyle = "darkblue";
  self.ctx.font = "30px Verdana";
  self.ctx.fillText("Lives: " + self.lives, 20, 40);
};

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