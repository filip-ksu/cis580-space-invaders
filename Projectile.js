class Projectile {
    constructor(x, y, width, height, dy, colour, CANVAS_WIDTH, CANVAS_HEIGHT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.dy = dy * 3;
    }

    drawSelf(ctx) {
        ctx.fillStyle = this.colour;
        if (this.dy > 0) {
            ctx.fillRect(this.x, this.y, this.width, this.height / 2);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.height / 2);
            ctx.lineTo(this.x + this.width / 2, this.y + this.height);
            ctx.lineTo(this.x + this.width, this.y + this.height / 2);
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.height / 2);
            ctx.lineTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.x + this.width, this.y + this.height / 2);
            ctx.closePath();
            ctx.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
        }
        ctx.fill();
    }

    updatePosition() {
        this.y += this.dy;
    }
}
