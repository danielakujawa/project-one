"use strict";

function Element(ctx, size, types) {
  this.ctx = ctx;
  this.position = {
    x: 960,
    y: Math.floor(Math.random() * 440) //random
  };
  this.size = {
    width: 60,
    height: 60
  };
  this.speed = {
    x: getRandomArbitrary(-2, -5)
  };

  this.type = types[Math.floor(Math.random() * 2)]

  this.cageImage = new Image();
  this.cageImage.src = "../images/cage.png";

  this.mangoImage = new Image();
  this.mangoImage.src = "../images/mango.png";
}

Element.prototype.draw = function () {
  var self = this;
  if (self.type === "cage") {
    self.ctx.drawImage(self.cageImage, self.position.x, self.position.y, self.size.width, self.size.height)
  } else {
    self.ctx.drawImage(self.mangoImage, self.position.x, self.position.y, self.size.width, self.size.height)
  }

  // self.ctx.fillStyle = "black";
  // self.ctx.fillRect(
  //   self.position.x,
  //   self.position.y,
  //   self.size.width,
  //   self.size.height
  // );
};


Element.prototype.move = function () {
  var self = this;
  self.position.x += self.speed.x;
};

// Helper Function

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
