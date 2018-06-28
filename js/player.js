"use strict";

function Player(ctx) {
  this.ctx = ctx;
  this.position = {
    x: 30,
    y: 60
  };

  this.size = {
    width: 100,
    height: 100
  };
  this.lives = 3;
  this.speed = 60;

  this.image1 = new Image();
  this.image1.src = "../images/parrot-fly-wing-up.png";
  this.image2 = new Image();
  this.image2.src = "../images/parrot-fly-wing-down.png";

  this.image1Drawn = false;
  this.imgVariable = 1;

  this.counter = 0;
}

Player.prototype.draw = function () {
  var self = this;
  if (self.imgVariable === 1) {

    self.ctx.drawImage(self.image1, self.position.x, self.position.y, self.size.width, self.size.height)
    self.image1Drawn = true;
    self.counter++

  } else if (self.imgVariable === 2) {

    self.ctx.drawImage(self.image2, self.position.x, self.position.y, self.size.width, self.size.height)
    self.image1Drawn = false;
    self.counter++
  }
  if (self.counter === 12) {

    if (self.image1Drawn === true) {
      self.imgVariable = 2;
      self.counter = 0;
    } else if (self.image1Drawn === false) {
      self.imgVariable = 1;
      self.counter = 0;
    }
  }


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
  self.ctx.fillStyle = "#1c2e58";
  self.ctx.font = "24px 'Bungee', cursive";
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