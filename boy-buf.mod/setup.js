module.exports = function() {
    lib.debug.configure()
    lib.util.loadConfig()

    // patches
    _$.boy = _ // mix shortcut
    lib.math = _$.lib.math
    res.pods.drawImage = image

    lib.remap.sfx()
    lib.remap.tiles.adjustHue()

    lib.pods.populate()

    lib.gen.screen()
    lib.util.hideCursor()

    lab.screen.apply(e => e.hide())

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
