const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const cw = canvas.width = 1000;
const ch = canvas.height = 500;

const ballSize = 20;
let ballX = cw/2 - ballSize/2;
let ballY = ch/2 - ballSize/2;

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 4;
const lineHeight = 16;

let ballSpeedX = 6;
let ballSpeedY = 6;

function player () {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function ai () {
    ctx.fillStyle = 'pink';
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

function table() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,cw,ch);
    
    for(let linePosition = 20; linePosition < ch; linePosition +=30) {
        ctx.fillStyle = "gray";
        ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight)
    }
}

function ball() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if(ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUp();
    }
    if(ballX <= 0 || ballX + ballSize >= cw) ballSpeedX = -ballSpeedX;
    
//    if(ballX <= playerX + paddeWidth || ballX >= aiX - ballSize && ballY > playerY && ballY < playerY + paddeHeight) {
//        ballSpeedX = -ballSpeedX;
//    }
}




const topCanvas = canvas.offsetTop;


function playerPosition(e) {
    playerY = e.clientY - topCanvas - paddleHeight/2;
    
    if(playerY >= ch - paddleHeight) playerY = ch - paddleHeight;
    if(playerY <= 0) playerY = 0;
}
canvas.addEventListener('mousemove', playerPosition);

function aiPosition () {
    var middlePaddle = aiY + paddleHeight / 2;
    var middleBall = ballY + ballSize / 2;
    
//    console.log(`${middlePaddle - middleBall}, ${middleBall}`);
    
    if(ballX > 500) {
        if(middlePaddle - middleBall > 200) {
            console.log("> 200");
            aiY -= 20;
        } else if(middlePaddle - middleBall > 50) {
            console.log("> 50");
            aiY -= 10;
        } else if(middlePaddle - middleBall < -200) {
            console.log("< -200");
            aiY += 20;
        } else if(middlePaddle - middleBall < -50) {
            console.log("< -50");
            aiY += 10;
        }
    } else if (ballX <= 500 && ballX > 150) {
        if(middlePaddle - middleBall < 100) {
            aiY += 3;
        } else if(middlePaddle - middleBall > -100) {
            aiY += 3;
        }
    }
}



function speedUp() {
    
    const speedValue = 0.5;
    
    if(ballSpeedX > 0 && ballSpeedX < 16) ballSpeedX += speedValue;
    else if (ballSpeedX < 0 && ballSpeedX > -16) ballSpeedX -= speedValue;
    
    if(ballSpeedY > 0 && ballSpeedY < 16) ballSpeedY += speedValue;
    else if (ballSpeedY < 0 && ballSpeedY > -16) ballSpeedY -= speedValue;
}



function game() {
table()
ball()
player()
ai()
aiPosition()
}

setInterval(game, 10)