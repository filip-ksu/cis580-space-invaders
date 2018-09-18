class Enemy {
    constructor(width, height, colour, CANVAS_WIDTH, CANVAS_HEIGHT) {
        this.x = Math.random() * (CANVAS_WIDTH - width);
        this.y = Math.random() * CANVAS_HEIGHT * -1;
        this.width = width;
        this.height = height;
        this.colour = colour;
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

    updatePosition(CANVAS_WIDTH) {
        let dx = Math.round(Math.random() * 2 - 1);
        let dy = Math.round(Math.random());
        this.x += dx;
        this.y += dy;
        if (this.x + this.width >= CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - this.width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }
}
