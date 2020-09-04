module.exports = function() {
    _$.boy = _ // mix shortcut

    lib.gen.screen()
    lib.util.hideCursor()

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
    if (_$.env.config.newGame) {
        _.trap.attach(function start() {
            log('hyperjump to newgame')
            trap('newGame')
        })
    }
}
