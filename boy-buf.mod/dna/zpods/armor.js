const df = {
    name: 'armor',
    title: 'Armor Plating',
    tag: 'armor',
    system: false,
    cost: 10,
    hits: 120,
}
class armor extends dna.Pod {
    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }
}
