class Player {
    constructor(x, y, width, height, colour) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
    }

    drawSelf(ctx) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.closePath();
        ctx.fill();
    }

    updatePosition(currentInput, CANVAS_WIDTH) {
        if (currentInput.right) {
            this.x += 10;
        }
        if (currentInput.left) {
            this.x -= 10;
        }
        if (this.x + this.width >= CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - this.width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }

    isHitBy(object) {
        return (object.y + object.height >= this.y && object.x <= this.x + this.width && object.x + object.width >= this.x);
    }
}
