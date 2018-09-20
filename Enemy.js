class Enemy {
    constructor(width, height, colour, CANVAS_WIDTH, CANVAS_HEIGHT) {
        this.x = Math.random() * (CANVAS_WIDTH - width);
        this.y = Math.random() * CANVAS_HEIGHT * -1;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.dx = Math.round(Math.random() * 6 - 3);
        this.dy = 1;
        this.tick = 0;
        this.maxTick = Math.round(Math.random() * 2 + 1);
    }

    drawSelf(ctx) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height / 2);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.closePath();
        ctx.fill();
    }

    updatePosition(CANVAS_WIDTH, CANVAS_HEIGHT, endGameCallback) {
        this.tick++
        this.x += this.dx;
        if (this.tick === this.maxTick) {
            this.y += this.dy;
            this.tick = 0;
        }
        if (this.x + this.width >= CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - this.width;
            this.dx *= -1;
        }
        if (this.x < 0) {
            this.x = 0;
            this.dx *= -1;
        }
        if (this.y > CANVAS_HEIGHT - this.height) {
            endGameCallback();
        }
    }

    isHitBy(object) {
        return (this.y + this.height >= 0 && object.y <= this.y + this.height && object.x <= this.x + this.width && object.x + object.width >= this.x);
    }
}
