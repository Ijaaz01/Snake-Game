//ideas bomb (30% of time), diagonal movement 
//board
var unitSize = 20;
var rows = 30;
var cols = 30;
var board;
var context;
var refresh;
var score = 0;

//food
var foodX;
var foodY;
var collision = 1;

//snake head
var snakeX = Math.floor(Math.random()*cols)*unitSize;
var snakeY = Math.floor(Math.random()*rows)*unitSize;
var velX = 0;
var velY = 0;

//snake body
var snakeBody = [];
var dead = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows*unitSize;
    board.width = cols*unitSize;
    context = board.getContext("2d");

    spawnFood();
    document.addEventListener("keydown", move);
    setInterval(update, 100);
}

function update() {
    if (dead) {
        gameOverScreen();
        return;
    }
    document.getElementById("score").innerHTML = score;
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, unitSize, unitSize);
    for (let i = snakeBody.length-1; i >= 0; i--) {
        if(i) {
            snakeBody[i] = snakeBody[i-1];
        }
        else {
            snakeBody[0] = [snakeX,snakeY];
        }
    }

    context.fillStyle = "yellow";
    snakeX += velX*unitSize;
    snakeY += velY*unitSize;
    endlessBoard();
    dead = collCheck(snakeX, snakeY);  
    //document.getElementById("score").innerHTML = snakeX;
    context.fillRect(snakeX, snakeY, unitSize, unitSize);

    if (snakeX == foodX && snakeY==foodY) {
        snakeBody.push([foodX, foodY]);
        score+=100;
        spawnFood();
    }
    for (let i = 0; i <snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0],snakeBody[i][1], unitSize, unitSize);
    }
}

function move(event) {
    if (event.code == "ArrowLeft" && velX != 1) {
        velX = -1;
        velY = 0;
    }
    else if (event.code == "ArrowRight" && velX != -1) {
        velX = 1;
        velY = 0;
    }
    else if (event.code == "ArrowUp" && velY != 1) {
        velX = 0;
        velY = -1;
    }
    else if (event.key == "ArrowDown" && velY != -1) {
        velX = 0;
        velY = 1;
    }
    else if (event.key == "q") {
        dead = 1;
    }
}

function endlessBoard() {
    if (snakeX < 0) {
        snakeX = cols*unitSize-unitSize;
    }
    else if (snakeX >= cols*unitSize) {
        snakeX = 0;
    }
    if (snakeY >= rows*unitSize) {
        snakeY = 0;
    }
    else if (snakeY < 0) {
        snakeY = rows*unitSize-unitSize;
    }
}

function collCheck(x, y) {
    for (let i = 0; i < snakeBody.length; i ++) {
        if (x == snakeBody[i][0] && y == snakeBody[i][1]) {
            return 1;
        }
    }
    return 0;
}

function gameOverScreen() {
    context.fillStyle = "white";
    context.fillRect(unitSize, rows*unitSize/4, (cols-2)*unitSize, rows*unitSize/2);
    context.fillStyle = "black";
    context.font = "100px Calibri";
    context.fillText("GAME OVER", 2.5*unitSize, (rows*unitSize/2)+unitSize);
}

function spawnFood() {
    while (collision) {
        foodX = Math.floor(Math.random()*cols)*unitSize;
        foodY = Math.floor(Math.random()*rows)*unitSize;
        collision = collCheck(foodX,foodY);
    }
    collision = 1;
}

