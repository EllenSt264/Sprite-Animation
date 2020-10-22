const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const images = {};
images.player = new Image();
images.player.src = "../assets/img/cuphead.png";

// JavaScript es6 class is used when you want to create many similar objects
//const characterActions = ["up", "top right", "right", "down right", "down", "jump"];
const characterActions = ["up", "right", "jump", "down right"];

const numberOfCharacters = 10;

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
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = (Math.random() * 1.5) + 3.5;   // random num between 3.5 and 5
        // Will determine what direction the sprite is walking
        // Math.floor returns the largest integer less than or equal to a given number - round down the decimals
        this.action = characterActions[Math.floor(Math.random() * characterActions.length)]; 
        // Assigns correct animation frame to movement
        if (this.action === "up") {
            this.frameY = 0;
            this.minFrame = 4;
            this.maxFrame = 15;
        } 
        else if (this.action === "right") {
            this.frameY = 3;
            this.minFrame = 3;
            this.maxFrame = 13;
        }
        else if (this.action === "jump") {
            this.frameY = 7;
            this.minFrame = 0;
            this.maxFrame = 9;
        }
        else if (this.action === "down right") {
            this.frameY = 4;
            this.minFrame = 4;
            this.maxFrame = 15;
        }
    }
    // To get this sprite to animate
    draw() {
        drawSprite(images.player, this.width * this.frameX, this.height * this.frameY, this.width, this.height,
        this.x, this.y, this.width, this.height);
        // Allows for the sprite's walking animation
        if (this.frameX < this.maxFrame) {
            this.frameX ++;
        }
        else {
            this.frameX = this.minFrame;
        }
    }
    // Custom method
    update() {
        if (this.action === "right") {
            /* When the sprite walks past the right edge of canvas, we will reset it and hide it just before the left edge of canvas
            like an infinite loop */
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width;
                // set y property to be a random number between 0 and canvas height - character height
                this.y = Math.random() * (canvas.height - this.height);
            }
            else {
                this.x += this.speed;
            }
        }
        else if (this.action === "up") {
            if (this.y < (0 - this.height)) {
                this.y = canvas.height + this.height;
                this.x = Math.random() * canvas.width;
            }
            else {  // the sprite hasn't walked off the screen yet, push it up
                this.y -= this.speed;
            }
        }
        else if (this.action === "down right") {
            /* Check if this.y is more than canvas and distant height && if this.x is more than this.width + canvas.width
            Check if the character has walked past the edge along both horizontal and vertical axis
            */
            if (this.y < (0 - this.height) && this.x > this.width + canvas.width) {
                this.y = 0 - this.height;
                this.x = Math.random() * canvas.width / 2;  // this.width plus canvas width
            }
            else {  // the sprite hasn't walked off the screen yet, push it up
                this.y += this.speed;
                this.x += this.speed;
            }
        }
    }
}

/* The for loop will run 10 times
And randomly create 10 characters
*/
for (i = 0; i < numberOfCharacters; i++) {
    /* Classes cannot be hoisted the same way function can,
    in this case, you cannot call class constructor before its declared
    it needs to be called AFTER it is declared
    */
    characters.push(new Character());
}


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    /* Cycle through characters array
    For each of these objects call draw() and update()
    on them
    */
    for (i = 0; i < characters.length; i++) {
        characters[i].draw();      // method created in Character class
        characters[i].update();    // checks if character action is === to right; if so animates it walking to the right
    }
}

window.onload = setInterval(animate, 1000/30);      // RequestAnimationFrame will be too fast

// To stop the sprite from stretching when the browser window is set to a different size after load
window.addEventListener("resize", function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});