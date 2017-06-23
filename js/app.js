// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  //Define bug speeds
  this.speed = Math.floor((Math.random() * 5) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  console.log("update");
  this.x = this.x + 101 * dt * this.speed;
  if (this.x > 700) {
    this.respaw();
  }
};

//For set y values to create enemy
var yRespaw = [300, 220, 140, 60];

//Respaw enemies into the game
Enemy.prototype.respaw = function () {
  this.x = -200;
  this.y = yRespaw[Math.floor(Math.random() * 5)];
  this.speed = Math.floor((Math.random() * 5) + 1);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';

  //Player initial location for reseting
  this.xInit = x;
  this.yInit = y;
};

Player.prototype.update = function() {
  this.x;
  this.y;
};

Player.prototype.reset = function() {
  //Redraw player on initial position after collision w/ enemy
  this.x = this.xInit;
  this.y = this.yInit;
  player.render();
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      if (this.y > 0) {
        this.y -= 80;
      }
      break;
    case 'down':
      if (this.y < 380) {
        this.y += 80;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x < 606) {
        this.x += 101;
      }
      break;
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for (var i = 0; i < 5; i++) {
  var x = Math.floor(Math.random() * -10 + 1);
  var y = yRespaw[Math.floor(Math.random() * 5)];
  var enemy = new Enemy(x, y);
  allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player(303, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);

  if (e.keyCode in allowedKeys) {
    e.preventDefault();
  };
});
