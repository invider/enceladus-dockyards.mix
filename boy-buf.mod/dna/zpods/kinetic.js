const df = {
    name: 'kinetic',
    title: 'Kinetic Shell',
    tag: 'kinetic',
    system: false,
    cost: 25,
    hits: 100,
    shots: 10,
}

class kinetic extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }
}
