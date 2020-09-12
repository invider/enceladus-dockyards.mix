const df = {
    name: 'debris',
    title: 'debris',
    tag: 'debris',
    system: false,
    cost: 0,
    hits: 1,
}

class DebrisPod extends dna.Pod {

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
