const df = {
    name: 'designer'
}

class Designer {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    draw() {
        save()
        translate(this.x, this.y)

        fill(env.style.color.c1)
        rect(0, 0, 40, 80)

        restore()
    }
}
