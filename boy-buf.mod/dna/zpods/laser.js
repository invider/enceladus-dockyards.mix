const df = {
    name: 'laser',
    title: 'Laser Mk1',
    system: true,
    hits: 25,
    cost: 50,
    charge: 0,
    maxCharge: 10,
    attack: 10,
}

class laser extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
    }

    init() {
        this.charge = this.maxCharge
    }

    triggerOn() {
        // lasers MUST be fully charged to fire
        if (this.charge === this.maxCharge) {
            return 'Lasers'
        }
    }
}
