const canvasContainer = document.getElementById('content').children[0];
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const PLAYER_COLOUR = '#00ff00';
const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 27;
const ENEMY_COLOUR = '#ff0000';
const BULLET_COLOUR = '#000000';

const canvas = document.createElement('canvas');
const canvasCtx = canvas.getContext('2d');
canvas.id = 'canvas';
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvasContainer.appendChild(canvas);

const buffer = document.createElement('canvas');
const bufferCtx = buffer.getContext('2d');
buffer.width = CANVAS_WIDTH;
buffer.height = CANVAS_HEIGHT;

console.log(CANVAS_WIDTH);
console.log(CANVAS_HEIGHT);

let currentInput = {
    space: false,
    left: false,
    right: false
}

let previousInput = {
    space: false
}

let player = new Player((CANVAS_WIDTH - PLAYER_WIDTH) / 2, CANVAS_HEIGHT - PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOUR);
let enemies = generateEnemies();

function generateEnemies() {
    let enemies = [];
    for (let i = 0; i < 20; i++) {
        enemies.push(new Enemy(PLAYER_WIDTH, PLAYER_HEIGHT, ENEMY_COLOUR, CANVAS_WIDTH, CANVAS_HEIGHT));
    }
    return enemies;
}

function gameLoop() {
    updateWorld();
    render(bufferCtx);
    canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvasCtx.drawImage(buffer, 0, 0);
    window.requestAnimationFrame(gameLoop);
}

function render(ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.drawSelf(ctx);
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].drawSelf(ctx);
    }
}

function updateWorld() {
    player.updatePosition(currentInput, CANVAS_WIDTH);
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].updatePosition();
    }
}

function handleKeydown(event) {
    switch(event.key) {
        case ' ':
            currentInput.space = true;
            break;
        case 'ArrowLeft':
            currentInput.left = true;
            break;
        case 'ArrowRight':
            currentInput.right = true;
            break;
    }
}

function handleKeyup(event) {
    switch(event.key) {
        case ' ':
            currentInput.space = false;
            break;
        case 'ArrowLeft':
            currentInput.left = false;
            break;
        case 'ArrowRight':
            currentInput.right = false;
            break;
    }
}

window.addEventListener('keydown', handleKeydown);
window.addEventListener('keyup', handleKeyup);
window.requestAnimationFrame(gameLoop);
