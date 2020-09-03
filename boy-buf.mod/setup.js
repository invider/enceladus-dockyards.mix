module.exports = function() {
    _$.boy = _ // mix shortcut

    lib.gen.screen()

    
    lab.screen.hideAll()

    lab.vfx.transit({
        fadein: 0,
        keep: 2.5,
        onFadeOut: function() {
            lab.screen.show()
            trap('start')
        },
        fadeout: 2,
    })

    // debug config
    if (_$.env.config.design) {
        _.trap.attach(function start() {
            log('hyperjump to design')
            trap('design')
        })
    }
}
