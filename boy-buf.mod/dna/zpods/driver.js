const df = {
    name: 'driver',
    title: 'Mass Driver',
    system: true,
    cost: 100,
    hits: 50,
    effective: .5,
    charge: 100,
    attack: 70,
}

class driver extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    init() {
        this.charge = this.df.charge
    }

    triggerOn() {
        if (this.dead) return
        if (this.hits > this.df.hits * this.df.effective
                && this.charge === this.df.charge) {
            return 'Mass Driver'
        }
    }

    activate(target, x, y) {
        this.charge = 0
        target.hit(this.attack, this.name, x, y)
    }
}
