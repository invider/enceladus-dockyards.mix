const df = {
    name: 'gen',
    title: 'Shield Gen',
    cost: 75,
    hits: 20,
    charge: 0,
    maxCharge: 100,
}

class gen extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
    }

    init() {
        this.charge = this.maxCharge
        log('charging shields in ' + this.ship.name)
    }
}
