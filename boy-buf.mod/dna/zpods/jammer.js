const df = {
    name: 'jammer',
    title: 'ECM Jammer',
    tag: 'jammer',
    system: true,
    cost: 100,
    hits: 25,
    charge: 35,
}

class jammer extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }
}
