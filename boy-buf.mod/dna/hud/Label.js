const df = {
    text: 'label',
    x: 0,
    y: 0,
}

class Label {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        if (!this.color) this.color = env.style.color.c3
    }

    draw() {
        fill(this.color)
        baseMiddle()
        alignCenter()
        font(env.style.font)
        text(this.text, this.x + env.style.textShift.x, this.y + env.style.textShift.y)
    }

    setText(t) {
        this.text = t
    }
}
