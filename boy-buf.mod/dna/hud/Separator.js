class Separator {
    constructor(st) {
        augment(this, st)
        if (!this.color) this.color = env.style.color.c3
    }

    draw() {
        lineWidth(2)
        stroke(this.color)
        line(this.x, 0, this.x, ctx.height)
    }
}
