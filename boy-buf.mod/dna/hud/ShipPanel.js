class ShipPanel extends sys.LabFrame {

    constructor(st) {
        super(st)
    }

    init() {
        this.constructHud()
    }

    constructHud() {
        this.attach({
            name: 'status',
            draw: this.drawContent,
            hidden: true,
            x: this.x,
            y: this.y,
        })

        const panel = this
        this.spawn(dna.hud.HLevel, {
            name: 'hits',
            x: this.x + 1,
            y: this.y + 24,
            w: this.w - 3,
            h: 5,
            bcolor: env.style.color.c1,
            lcolor: env.style.color.c2,
            value: () => {
                const system = panel.ship.systemHits()
                const SYSTEM = panel.ship.maxSystemHits
                return system/SYSTEM
            }
        })
    }

    monitor(ship) {
        this.ship = ship
        this.status.ship = ship
        this.hidden = false
    }

    drawContent() {
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

        const system = this.ship.systemHits()
        const SYSTEM = this.ship.maxSystemHits
        const pSystem = floor((system/SYSTEM)*100)

        if (maxHits > 0 && SYSTEM > 0) {
            text(`hits: ${pHits}%/${pSystem}%`, x, y)
        } else if (maxHits > 0) {
            text(`hits: ${pHits}%`, x, y)
        }

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
