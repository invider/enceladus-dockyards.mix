module.exports = function() {
    lib.debug.configure()
    _$.boy = _ // mix shortcut

    lib.remap.sfx()

    lib.pods.populate()

    lib.gen.screen()
    lib.util.hideCursor()

    lab.screen.hideAll()

    log('holding for ' + env.style.holdBeforeStart)
    lab.vfx.transit({
        fadeIn: 0,
        keep: env.style.holdBeforeStart,
        onFadeOut: function() {
            lab.screen.show()
            trap('start')
        },
        fadeOut: env.style.fadeOut,
    })
}
