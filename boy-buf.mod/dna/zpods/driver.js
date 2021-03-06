const df = {
    name: 'driver',
    title: 'Mass Driver',
    tag: 'driver',
    action: 'mass driver',
    system: true,
    cost: 100,
    hits: 50,
    charge: 75,
    attack: 100,
    shots: 10,
    precision: .7,
}

class driver extends dna.WeaponPod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    isReady() {
        return (super.isReady() && this.shots > 0)
    }

    resupply() {
        const ammoPods = this.ship.pods.filter((pod) => pod.tag === 'kinetic')
        if (ammoPods.length > 0) {
            const pod = lib.math.rnde(ammoPods)
            const shots = pod.shots
            this.shots += shots
            pod.shots = 0
            pod.kill()
                
            log(`[${this.ship.name}]/${this.name} resupplied x${this.shots}`)
            const loc = this.ship.visualGrid.cellScreenCoord(pod)
            lib.vfx.mintAt(`+${shots} shots`, loc.x, loc.y, this.ship.left)
            sfx.play('consume', env.mixer.level.consume)
        }
    }

    activate(target, x, y) {
        if (!this.isReady()) return
        const weapon = this

        // fire
        this.shots--
        this.charge = 0

        if (this.shots === 0) {
            this.resupply()
        }

        this.vibrate()
        const loc = this.ship.visualGrid.cellScreenCoord(this)
        lab.screen.battle.vfx.spawn(dna.Projectile, {
            type: this.kind,
            x: loc.x,
            y: loc.y - 10,
            onOut: () => {
                target.incoming(weapon, weapon.attack, x, y)
            }
        })
        sfx.play('beam', env.mixer.level.driver)
    }
}
