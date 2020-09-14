const df = {
    name: 'laser',
    title: 'Laser',
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
        const weapon = this
        this.charge = 0

        this.vibrate()
        const loc = this.ship.visualGrid.cellScreenCoord(this)
        lab.screen.battle.vfx.spawn(dna.Projectile, {
            type: this.kind,
            x: loc.x,
            y: loc.y - 15,
            onOut: () => {
                target.incoming(weapon, weapon.attack, x, y)
            }
        })
        sfx.play('laser2', env.mixer.level.laser)
    }
}
