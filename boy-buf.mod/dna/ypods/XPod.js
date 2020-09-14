const df = {
    name: 'x',
    title: 'x',
    tag: 'x',
    system: false,
    cost: 0,
    hits: 1,
}

class XPod extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    // ignore
    hit(attack) {}

    // ignore
    repair() {}

    // ignore
    kill() {}
}
