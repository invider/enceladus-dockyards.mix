const df = {
    x: 0,
    y: 0,
}

class ShipGrid {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        if (!this.layout) {
            // set default
            this.layout = dna.spec.layout.basic
        }
    }

    draw() {
        save()
        translate(this.x, this.y)
        
        stroke(env.style.color.fg0)
        lineWidth(1)

        const s = 14
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
                if (this.layout[y][x] > 0) {
                    rect(x*s, y*s, s, s)
                }
            }
        }
        restore()
    }
}
