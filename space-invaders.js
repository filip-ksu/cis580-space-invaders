const canvasContainer = document.getElementById('content').children[0];
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const PLAYER_COLOUR = '#00ff00';
const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 27;
const ENEMY_COLOUR = '#ff0000';
const PROJECTILE_WIDTH = 4;
const PROJECTILE_HEIGHT = 12;
const PROJECTILE_COLOUR = '#000000';

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

let playerAlive = true;
let lastUpdate = null;
let kills = 0;
let tick = 0;

let currentInput = {
    space: false,
    left: false,
    right: false
}

let previousInput = {
    space: false
}

let player = new Player((CANVAS_WIDTH - PLAYER_WIDTH) / 2, CANVAS_HEIGHT - PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOUR);
let enemies = []
let playerProjectiles = [];
let enemiesProjectiles = [];

function generateEnemies(array) {
    for (let i = 0; i < 20; i++) {
        array.push(new Enemy(PLAYER_WIDTH, PLAYER_HEIGHT, ENEMY_COLOUR, CANVAS_WIDTH, CANVAS_HEIGHT));
    }
}

function gameLoop(timestamp) {
    if (playerAlive) {
        tick++;
        if (tick > 600) {
            tick = 0;
            generateEnemies(enemies);
        }
        updateWorld(timestamp);
        checkColisions();
        renderGame(bufferCtx);
        canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        canvasCtx.drawImage(buffer, 0, 0);
        window.requestAnimationFrame(gameLoop);
    } else {
        renderGameOver(bufferCtx);
        canvasCtx.drawImage(buffer, 0, 0);
    }
}

function renderGame(ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].drawSelf(ctx);
    }
    for (let i = 0; i < playerProjectiles.length; i++) {
        playerProjectiles[i].drawSelf(ctx);
    }
    player.drawSelf(ctx);

    ctx.font = '40px Open-Sans';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.87)';
    ctx.fillText(kills, 10, 40);
}

function renderGameOver(ctx) {
    ctx.font = '64px Open-Sans';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.87)';
    ctx.fillText('Game over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

function endGameCallback() {
    playerAlive = false;
}

function updateWorld(timestamp) {
    if (!lastUpdate) {
        lastUpdate = timestamp;
    }
    let elapsedTime = timestamp - lastUpdate;
    player.updatePosition(currentInput, CANVAS_WIDTH);
    for (let i = playerProjectiles.length - 1; i >= 0; i--) {
        playerProjectiles[i].updatePosition();
        if (playerProjectiles[i].y < -PROJECTILE_HEIGHT) {
            playerProjectiles.splice(i, 1);
        }
    }
    if (currentInput.space && !previousInput.space) {
        previousInput.space = true;
        playerProjectiles.push(new Projectile(player.x + (player.width - PROJECTILE_WIDTH) / 2, player.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, -1, PROJECTILE_COLOUR, CANVAS_WIDTH, CANVAS_HEIGHT));
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].updatePosition(CANVAS_WIDTH, CANVAS_HEIGHT, endGameCallback);
    }
}

function checkColisions() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        playerAlive &= !player.isHitBy(enemies[i]);
        for (let j = playerProjectiles.length - 1; j >= 0; j--) {
            if (enemies[i] === undefined) {
                console.log(enemies.length);
                console.log(i);
                return;
            }
            if (enemies[i].isHitBy(playerProjectiles[j])) {
                enemies.splice(i, 1);
                playerProjectiles.splice(j, 1);
                kills++;
                break;
            }
        }
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
            previousInput.space = false;
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

function newGame(event) {
    event.preventDefault();
    if (confirm('Do you really want to start a new game?')) {
        window.location.reload();
    }
}

document.getElementById('btn-new-game').addEventListener('click', newGame);
window.addEventListener('keydown', handleKeydown);
window.addEventListener('keyup', handleKeyup);
generateEnemies(enemies);
window.requestAnimationFrame(gameLoop);
