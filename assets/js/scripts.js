const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const images = {};
images.player = new Image();
images.player.src = "../assets/img/cuphead.png";

// JavaScript es6 class is used when you want to create many similar objects
const characterActions = ["up", "top right", "right", "down right", "down", "jump"];

// Created one instance of the Character class and pushed it into the characters array
const characters = [];

/* Create random values for the different character sprites
Each JavaScript class has one mandatory method: a constructor
This constructor will run once per object
The constructor creates the new instance of character object assigning values 
to properties on that object
*/
class Character {
    constructor() {
        this.width = 103.0625;
        this.height = 113.125;
        this.frameX = 3;
        this.frameY = 3;
        this.x = 0;
        this.y = 0;
        this.speed = (Math.random() * 1.5) + 3.5;   // random num between 3.5 and 5
        // Will determine what direction the sprite is walking
        this.action = "right";     // taken from characterActions array
    }
    // To get this sprite to animate
    draw() {
        drawSprite(images.player, this.width * this.frameX, this.height * this.frameY, this.width, this.height,
        this.x, this.y, this.width, this.height);
        // Allows for the sprite's walking animation
        if (this.frameX < 13) {
            this.frameX ++;
        }
        else {
            this.frameX = 3;
        }
    }
    // Custom method
    update() {
        if (this.action === "right") {
            if (this.x < canvas.width + this.width) {
            this.x += this.speed;
            }
            /* When the sprite walks past the right edge of canvas, we will reset it and hide it just before the left edge of canvas
            like an infinite loop */
            else {
                this.x = 0 - this.width;
            }
        }
    }
}

/* Classes cannot be hoisted the same way function can,
in this case, you cannot call class constructor before its declared
it needs to be called AFTER it is declared
*/
characters.push(new Character());

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    characters[0].draw();      // method created in Character class
    characters[0].update();    // checks if character action is === to right; if so animates it walking to the right
}

window.onload = setInterval(animate, 1000/30);      // RequestAnimationFrame will be too fast

// To stop the sprite from stretching when the browser window is set to a different size after load
window.addEventListener("resize", function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});