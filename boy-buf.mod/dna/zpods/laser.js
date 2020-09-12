const df = {
    name: 'laser',
    title: 'Laser Mk1',
    action: 'lasers',
    tag: 'laser',
    system: true,
    cost: 50,
    hits: 25,
    charge: 10,
    attack: 20,
}

class laser extends dna.WeaponPod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    activate(target, x, y) {
        target.incoming(this, this.attack, x, y)
        this.charge = 0

        this.vibrate()
        const loc = this.ship.visualGrid.cellScreenCoord(this)
        lab.screen.battle.vfx.spawn(dna.Projectile, {
            type: 'laser',
            x: loc.x,
            y: loc.y + 15,
            r: 5,
        })
        sfx.play('laser2', env.mixer.level.laser)
    }
}
