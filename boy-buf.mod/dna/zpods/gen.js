const df = {
    name: 'gen',
    title: 'Shield Gen',
    tag: 'shield',
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
}
