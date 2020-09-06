const df = {
    name: 'laser',
    title: 'Laser Mk1',
    action: 'lasers',
    tag: 'laser',
    system: true,
    cost: 50,
    hits: 25,
    effective: .2,
    charge: 10,
    attack: 10,
}

class laser extends dna.WeaponPod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    triggersOn(action) {
        return (this.isReady() && action === 'Lasers')
    }

    activate(target, x, y) {
        this.charge = 0
        target.hit(this.attack, this.name, x, y)
    }
}
