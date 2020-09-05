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

        const x = 0
        let y = 0
        const hits = this.ship.totalHits()
        const maxHits = this.ship.maxHits
        const pHits = floor((hits/maxHits)*100)
        if (maxHits > 0) text(`hits: ${pHits}%`, x, y)

        y += 10
        const charge = this.ship.currentCharge()
        const maxCharge = this.ship.maxCharge()
        const pCharge = floor((charge/maxCharge)*100)
        if (maxCharge > 0) text(`charge: ${pCharge}%`, x, y)

        y += 10
        const shields = this.ship.shields()
        const maxShields = this.ship.maxShields
        const pShields = floor((shields/maxShields)*100)
        if (maxShields > 0) text(`shields: ${pShields}%`, x, y)

        restore()
    }
}
