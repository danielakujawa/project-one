"use strict";

function Element(ctx, size) {
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
}

Element.prototype.draw = function () {
  var self = this;
  self.ctx.fillStyle = "black";
  self.ctx.fillRect(
    self.position.x,
    self.position.y,
    self.size.width,
    self.size.height
  );
};

Element.prototype.move = function () {
  var self = this;
  self.position.x += self.speed.x;
};

// Helper Function

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
