const df = {
    name: 'missile',
    title: 'Missile Mk1',
    system: true,
    cost: 30,
    hits: 10,
    attack: 100,
}
class missile extends dna.Pod {

    constructor(st) {
        super(st)
    }

    triggerOn() {
        // missiles are always ready to fire
        return 'Missile'
    }
}
