"use strict";

function Elements(ctx, size) {
  this.ctx = ctx;
  this.position = {
    x: 200,
    y: 20 //random
  };
  this.size = {
    width: 20,
    height: 20
  };
  this.speed = {
    x: -2
  };
}

Elements.prototype.draw = function() {
  var self = this;
  self.ctx.fillStyle = "black";
  self.ctx.fillRect(
    self.position.x,
    self.position.y,
    self.size.width,
    self.size.height
  );
};

Elements.prototype.move = function() {
  var self = this;
  self.position.x += self.speed.x;
};
