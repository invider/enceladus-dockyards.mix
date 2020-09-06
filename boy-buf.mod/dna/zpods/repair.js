const df = {
    name: 'repair',
    title: 'Repair Bot',
    tag: 'repair',
    system: true,
    hits: 40,
    cost: 60,
    charge: 30,
}

class repair extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    turn() {
        // TODO find a random damaged element
        //      and fix to the max charge
    }
}
