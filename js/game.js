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

  self.doFrame();
};

Game.prototype.createElement = function () {
  var self = this;
  if (self.elements.length < 5) {
    debugger;
    var newElement = new Element(self.ctx, self.size, self.position, self.createTypes());
    self.elements.push(newElement);
  }
};

Game.prototype.createTypes = function () {
  var self = this;
  var types = ["cage", "mango"]

  var random = types[Math.floor(Math.random() * 2)];
  console.log(random);
  return random;
}

Game.prototype.checkIfEnded = function () {
  var self = this;
  if (self.player.lives <= 0) {
    this.isEnded = true;
  } else if (self.counter === 3600) {
    this.isEnded = true;
  }
}

Game.prototype.checkCollisions = function () {
  var self = this;

  let playerLeft = self.player.position.x;
  let playerRight = self.player.position.x + self.player.size.width;
  let playerTop = self.player.position.y;
  let playerBottom = self.player.position.y + self.player.size.height;



  this.elements.forEach(function (element, index) {
    var elementLeft = element.position.x;
    var elementRight = element.position.x + element.size.width;
    var elementTop = element.position.y;
    var elementBottom = element.position.y + element.size.height;

    if (elementLeft <= playerRight && playerRight <= elementRight) {

      if (elementTop <= playerBottom && playerBottom <= elementBottom) {

        self.elements.splice(index, 1);
        if (element.type === "cage") {
          self.player.lives -= 1;
        } else {
          console.log("+10");
        }

      } else if (elementTop <= playerTop && playerTop <= elementBottom) {

        self.elements.splice(index, 1);
        if (element.type === "cage") {
          self.player.lives -= 1;
        } else {
          console.log("+10");
        }
      }

    } else if (elementLeft <= playerLeft && playerLeft <= elementRight) {

      if (elementTop <= playerBottom && playerBottom <= elementBottom) {

        self.elements.splice(index, 1);
        if (element.type === "cage") {
          self.player.lives -= 1;
        } else {
          console.log("+10");
        }

      } else if (elementTop <= playerTop && playerTop <= elementBottom) {

        self.elements.splice(index, 1);
        if (element.type === "cage") {
          self.player.lives -= 1;
        } else {
          console.log("+10");
        }

      }
    }

  })



  if (self.player.position.y <= 0) {
    self.player.position.y += 4;
  }
  else if (self.player.position.y + self.player.size.height >= self.size.height) {
    self.player.position.y -= 4;
  } else if (self.player.position.x <= 0) {
    self.player.position.x += 4;
  } else if (self.player.position.x + self.player.size.height >= self.size.width) {
    self.player.position.x -= 4;
  }
}


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
  self.checkIfEnded();
  self.checkCollisions();
  self.checkElementsOffScreen();
  self.clearCanvas();
  self.update();
  self.draw();

  if (self.counter % 100 === 0) {
    self.createElement();

  }

  self.elements.forEach(function (item) {
    item.draw();
    item.move();
  });

  window.requestAnimationFrame(function () {
    if (!self.isEnded) {
      self.doFrame();
    }
    else if (self.isEnded) {

      self.callback();
    }
  });
};
