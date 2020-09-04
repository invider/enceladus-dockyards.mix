const df = {
    name: 'gen',
    title: 'Shield Gen',
    system: true,
    cost: 75,
    hits: 20,
    charge: 100,
}

class gen extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    init() {
        this.charge = this.df.charge
        log('charging shields in ' + this.ship.name)
    }
}
