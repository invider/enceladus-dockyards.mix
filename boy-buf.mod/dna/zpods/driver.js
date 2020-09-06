const df = {
    name: 'driver',
    title: 'Mass Driver',
    tag: 'driver',
    action: 'mass driver',
    system: true,
    cost: 100,
    hits: 50,
    effective: .5,
    charge: 75,
    attack: 100,
}

class driver extends dna.WeaponPod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    activate(target, x, y) {
        target.incoming(this, this.attack, x, y)
        //target.hit(this.attack, this.name, x, y)
        this.charge = 0
    }
}
