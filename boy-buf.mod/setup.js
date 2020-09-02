module.exports = function() {
    _$.boy = _ // mix shortcut

    // setup gameboy screen resolution
    ctx.width = _._$.env.tune.width
    ctx.height = _._$.env.tune.height
    ctx.canvas.width = _._$.env.tune.width
    ctx.canvas.height = _._$.env.tune.height

    // create screens
    lab.screen.touch('menu')
    augment(lab.screen.menu, dna.trait.hidable)
    lab.screen.touch('design')
    augment(lab.screen.design, dna.trait.hidable)
    lab.screen.touch('battle')
    augment(lab.screen.battle, dna.trait.hidable, {
        show: function() {
            this.hidden = false
            lab.control.player.bindAll(left)
        }
    })
    lab.screen.touch('score')
    augment(lab.screen.score, dna.trait.hidable)

    // create ship grids
    const left = lab.screen.battle.spawn(dna.ShipGrid, {
        Z: 11,
        name: 'left',
        x: 6,
        y: 12,
    })

    const right = lab.screen.battle.spawn(dna.ShipGrid, {
        Z: 11,
        name: 'right',
        x: 86,
        y: 12,
        layout: dna.spec.layout.whale,
    })
    //right.layout = dna.spec.layout.whale
    
    lab.screen.hideAll()

    lab.vfx.transit({
        fadein: 0,
        keep: 1,
        onFadeOut: function() {
            lab.screen.show()
            lab.screen.title.show()
            lab.control.player.bindAll(lab.screen.title)
        },
        fadeout: 2,
    })
}
