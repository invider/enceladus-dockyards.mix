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
    shells: 10,
}

class driver extends dna.WeaponPod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    isReady() {
        return (super.isReady() && this.shells > 0)
    }

    resupply() {
        const ammoPods = this.ship.pods.filter((pod) => pod.tag === 'kinetic')
        if (ammoPods.length > 0) {
            const pod = lib.math.rnde(ammoPods)
            this.shells += pod.shells
            pod.shells = 0
            pod.hit(pod.hits)
            log(`[${this.ship.name}]/${this.name} resupplied x${this.shells}`)
        }
    }

    activate(target, x, y) {
        if (!this.isReady()) return

        // fire
        this.shells--
        this.charge = 0
        target.incoming(this, this.attack, x, y)

        if (this.shells === 0) {
            this.resupply()
        }

        this.vibrate()
        sfx.play('beam', env.mixer.level.driver)
    }
}
