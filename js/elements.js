"use strict";

function Element(ctx, size) {
  this.ctx = ctx;
  this.position = {
    x: 960,
    y: Math.floor(Math.random() * 500) //random
  };
  this.size = {
    width: 60,
    height: 60
  };
  this.speed = {
    x: -10
  };
}

Element.prototype.draw = function() {
  var self = this;
  self.ctx.fillStyle = "black";
  self.ctx.fillRect(
    self.position.x,
    self.position.y,
    self.size.width,
    self.size.height
  );
};

Element.prototype.move = function() {
  var self = this;
  self.position.x += self.speed.x;
};
