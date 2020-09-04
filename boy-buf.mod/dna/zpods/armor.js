const df = {
    name: 'armor',
    title: 'Armor Plating',
    system: false,
    cost: 10,
    hits: 100,
}
class armor extends dna.Pod {
    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }
}
