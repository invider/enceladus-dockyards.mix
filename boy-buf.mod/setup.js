module.exports = function() {
    lib.debug.configure()

    // patches
    _$.boy = _ // mix shortcut
    lib.math = _$.lib.math
    res.pods.drawImage = image

    lib.remap.sfx()
    lib.remap.tiles.remap()

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
