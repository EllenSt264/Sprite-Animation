const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const images = {};
images.player = new Image();
images.player.src = "../assets/img/cuphead.png";

const playerWidth = 103.0625;
const playerHeight = 113.125;
let playerFrameX = 3;
let playerFrameY = 3;
let playerX = 0;
let playerY = 0;
const playerSpeed = 6;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawSprite(images.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight,
    playerX, playerY, playerWidth, playerHeight);
    // Allows for the sprite's walking animation
    if (playerFrameX < 13) {
        playerFrameX ++;
    }
    else {
        playerFrameX = 3;
    }
    // Moves the sprite across the canvas
    if (playerX < canvas.width + playerWidth) {
        playerX += playerSpeed;
    }
    // when the sprite walks past the right edge of canvas, we will reset it and hide it just before the left edge of canvas
    // like an infinite loop
    else {
        playerX = 0 - playerWidth;
    }
}

window.onload = setInterval(animate, 1000/30);      // RequestAnimationFrame will be too fast

// To stop the sprite from stretching when the browser window is set to a different size after load
window.addEventListener("resize", function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});