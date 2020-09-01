class ShipGrid {

    constructor(st) {
        augment(this, st)
    }

    draw() {
        save()
        translate(this.x, this.y)
        
        stroke(env.style.color.fg0)
        lineWidth(1)
        alpha(1)

        const s = 8
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                rect(x*s, y*s, s, s)
            }
        }
        restore()
    }
}
