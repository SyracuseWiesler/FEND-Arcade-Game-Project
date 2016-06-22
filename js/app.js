// At the beginning of each new game, we should choose a player and game level
function newGame(){
    var playerChoice = window.prompt("Please choose a player from Bob, Catherine, Gloria, Vicky, Princess", "Bob");
    var level = window.prompt("Please choose a level from Easy, Normal, Hard: ", "Normal");
    var pattern = /\s/; // the input shall not allow space;
    playerChoice = playerChoice.replace(pattern, "");
    level = level.replace(pattern, "");
    return [playerChoice, level];
}
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.sprite = sprite;
    this.sprite = 'images/enemy-bug.png';
    this.leveldegree = newRound[1] == "Easy"? 300: newRound[1] == "Normal"? 400: newRound[1] == "Hard"? 500: 300;
    this.speed = Math.floor(Math.random()*this.leveldegree + 200);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 505){
        this.x = -90;
        this.speed = Math.floor(Math.random()* this.leveldegree+ 200);//reset each enemy's speed
    }
    if(this.y - 15 == player.y && this.roundStep(this.x) == player.x){
        //console.log(this.x, this.y); // the enemy's x is not an integer, which is not easy to process like enemy's y
        //console.log(player.x, player.y);
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Enemy.prototype.roundStep = function(x){
    var range1 = [50, 150, 250, 350, 450];
    var range = [0, 100, 200, 300, 400];
    if(x > range1[0] && x <= range1[1]){
        return range[1];
    }else if(x> range1[1] && x <= range1[2]){
        return range[2];
    }else if(x> range1[2] && x <= range1[3]){
        return range[3];
    }else{
        return range[4];
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y){
    Enemy.call(this, x, y);
    //this.x = x;
    //this.y = y;
    this.score = 0;
    var spritestr = "images/";
    var spritefile = newRound[0] == "Bob"? "char-boy.png": newRound[0] == "Catherine"? "char-cat-girl.png": newRound[0] == "Gloria"? "char-horn-girl.png": newRound[0] == "Vicky"? "char-pink-girl.png": newRound[0] == "Princess"? "char-princess-girl.png": "char-boy.png";
    this.sprite = spritestr + spritefile;

};
Player.prototype.update = function(){
    //if(this.y < 80){
    //    this.y = 380;
    //}
    //this.x = 200;
    //this.y = 380;
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + this.score, 70, 580);


};
Player.prototype.handleInput = function(key){
    switch(key){
        case "left":
            if(this.x > 0){
                this.x -= 100;
                //console.log(this.x); // The left edge of the canvas is 0, each step to left or right is 100; [0, 100, 200, 300, 400]
            }
            break;
        case "right":
            if(this.x < 380){
                this.x += 100;
                //console.log(this.x);
            }
            break;
        case "up":
            if(this.y > 80){
                this.y -= 85;
            }else if(this.y < 80){  // successfully arrived at the bank, score + 1
                this.y = 380;
                this.score++;
            }
            break;
        case "down":
            if(this.y < 300){
                this.y += 85;
            }
            break;
    }
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
    if(this.score == 0){
        this.score = 0;
    }else{
        this.score --;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var newRound = newGame();
var allEnemies = [
    new Enemy(0, 55), // position of first enemy
    new Enemy(0, 140), // position of second enemy
    new Enemy(0, 225) //position of third enemy
];


var player = new Player(200, 380);


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
});
