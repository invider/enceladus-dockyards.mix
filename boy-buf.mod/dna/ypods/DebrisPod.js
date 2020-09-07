const df = {
    name: 'debris',
    title: 'debris',
    tag: 'debris',
    system: false,
    cost: 0,
    hits: 10,
}

class DebrisPod extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
    }

    hit(attack) {
        // ignore
    }

    kill() {
        // ignore
    }
}
