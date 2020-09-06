const df = {
    name: 'missile',
    title: 'Missile Mk1',
    tag: 'missile',
    action: 'Missile',
    system: true,
    cost: 30,
    hits: 10,
    effective: .5,
    attack: 100,
}
class missile extends dna.WeaponPod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    activate(target, x, y) {
        target.hit(this.attack, this.name, x, y)
        // consider all missiles are gone here
        this.fired = true
        this.state = 'fired at ' + x + ':' + y
            + ' @' + lab.screen.battle.control.turn
        this.ship.killPod(this)
    }
}
