const Z = 21

function draw() {
    alignCenter()
    baseMiddle()
    fill(env.style.color.c3)
    font('8px gameboy')
    text('Enceladus Dockyards', rx(.5), ry(.5))
}

function activate(action) {
    lab.vfx.transit({
        fadein: 1,
        hold: .5,
        onFadeOut: function() {
            lab.screen.title.hide()
            lab.screen.battle.show()
        },
        fadeout: 2,
    })
}
