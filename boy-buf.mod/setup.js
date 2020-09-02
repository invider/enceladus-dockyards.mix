module.exports = function() {
    _$.boy = _ // mix shortcut

    lib.gen.screen()

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
        keep: 2.5,
        onFadeOut: function() {
            lab.screen.show()
            trap('start')
            //lab.control.player.bindAll(lab.screen.title)
        },
        fadeout: 2,
        onComplete: function() {
            lab.screen.title.keep(env.style.titleTimeout)
        }
    })


    // debug config
    if (_$.env.config.design) {
        _.trap.attach(function start() {
            log('hyperjump to design')
            trap('design')
        })
    }
}
