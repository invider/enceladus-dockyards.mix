class ShipPanel {

    constructor(st) {
        augment(this, st)
    }

    monitor(ship) {
        this.ship = ship
    }

    draw() {
        if (!this.ship) return
        save()
        translate(this.x, this.y)

        baseTop()
        alignLeft()
        font(env.style.font)
        fill(env.style.color.c3)

        const hits = this.ship.totalHits()
        const maxHits = this.ship.maxHits
        text('hits: ' + hits  + '/' + maxHits, 0, 0)

        restore()
    }
}
