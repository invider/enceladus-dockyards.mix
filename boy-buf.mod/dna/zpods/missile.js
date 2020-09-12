const df = {
    name: 'missile',
    title: 'Missile Mk1',
    tag: 'missile',
    action: 'missile',
    system: true,
    cost: 30,
    hits: 10,
    attack: 80,
    minAttack: 5,
    subAttack: 15,
}
class missile extends dna.WeaponPod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    activate(target, x, y) {
        //target.hit(this.attack, this.name, x, y)
        target.incoming(this, this.attack, x, y)

        // kill the missile pod
        this.fired = true
        this.state = 'fired at ' + x + ':' + y
            + ' @' + lab.screen.battle.control.turn
        this.ship.killPod(this)

        const loc = this.ship.visualGrid.cellScreenCoord(this)
        lab.screen.battle.vfx.spawn(dna.Projectile, {
            type: 'missile',
            x: loc.x,
            y: loc.y,
            r: 5,
            speed: -120,
        })
        sfx.play('launch', env.mixer.level.launch)
    }
}
