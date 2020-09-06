module.exports = function() {
    lib.debug.configure()

    _$.boy = _ // mix shortcut
    lib.math = _$.lib.math

    lib.remap.sfx()

    lib.pods.populate()

    lib.gen.screen()
    lib.util.hideCursor()

    lab.screen.hideAll()

    if (!lib.debug.hyperjump()) {
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
}
