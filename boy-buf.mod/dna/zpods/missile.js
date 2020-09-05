const df = {
    name: 'missile',
    title: 'Missile Mk1',
    tag: 'missile',
    system: true,
    cost: 30,
    hits: 10,
    attack: 100,
}
class missile extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    triggerOn() {
        if (this.dead) return
        // missiles are always ready to fire
        return 'Missile'
    }

    activate(target, x, y) {
        target.hit(this.attack, this.name, x, y)
        // consider all missiles are gone here
        this.ship.removePod(this)
    }
}
