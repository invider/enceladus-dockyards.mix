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

        const s = 14
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
                rect(x*s, y*s, s, s)
            }
        }
        restore()
    }
}
