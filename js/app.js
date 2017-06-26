/*TODO:
 *Add gems that player have to collect
 *Make a portal after player collects all gems
 *Add a Win statement if player make to the portal w/ all gems
 */

//Global vars to randomize enemies and gems creations

//For set y values to create enemies
var yLanes = [300, 220, 140, 60];
//For set y values to create gems, +50 to aligment purpose
var yGems = [350, 270, 190, 110]
//Used to define x in gems, +20 to aligment purpose
var xCol = [20, 121, 222, 323, 424, 525, 626];
//Array to define gem sprites
var gemImg = ['blue', 'green', 'orange']

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

//Respaw enemies into the game
Enemy.prototype.respaw = function () {
  this.x = -200;
  this.y = yLanes[Math.floor(Math.random() * 5)];
  this.speed = Math.floor((Math.random() * 5) + 1);
};

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

//Update player on actual
Player.prototype.update = function() {
  this.x;
  this.y;
};

//Redraw player on initial position after collision w/ enemy
Player.prototype.reset = function() {
  this.x = this.xInit;
  this.y = this.yInit;
};

//Render player on canvas
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
  }
};

//Constructor for Gems
var Gem = function (x, y, n) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/g-' + gemImg[n] + '.png';
  this.Id = n;
  this.state = false;
};

Gem.prototype.collect = function(Id) {
  //Check wich gem was collected
  switch (Id) {
    case 0:
      this.x = 20;
      this.y = 430;
      this.state = true;
      break;
    case 1:
      this.x = 121;
      this.y = 430;
      this.state = true;
      break;
    case 2:
      this.x = 222;
      this.y = 430;
      this.state = true;
      break;
  }
};

Gem.prototype.update = function() {
  this.x;
  this.y;
}

//Render Gems to the screen
Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Portal = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/selector.png';
  //this.state = false;
}


Portal.prototype.win = function() {
 /*Player wins the game
  *create a condition to verify if player position is equal to portal position,
  *if is true, player wins
  */
};

//Render portal to the screen
Portal.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.

//Define portal variable
var portal = new Portal(606, -40);

//Place all gems
var allGems = [];

for (var z = 0; z < gemImg.length; z++) {
  var x = xCol[Math.floor(Math.random() * 7)];
  var y = yGems[Math.floor(Math.random() * 3)];
  var n = z;
  var gem = new Gem(x, y, n);
  allGems.push(gem);
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for (var i = 0; i < 7; i++) {
  var x = Math.floor(Math.random() * -10 + 1);
  var y = yLanes[Math.floor(Math.random() * 7)];
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
