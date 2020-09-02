const Z = 21
let timeout = 0

function evo(dt) {
    if (timeout > 0) {
        timeout -= dt
        if (timeout < 0) fadeOut()
    }
}

function keep(time) {
    timeout = time
}

function fadeOut() {
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

function draw() {
    alignCenter()
    baseMiddle()
    fill(env.style.color.c3)
    font('8px gameboy')
    text('Enceladus Dockyards', rx(.5), ry(.5))

    alignRight()
    baseBottom()
    font('8px retro')
    text('by Igor Khotin', rx(1)-8, ry(1)-8)
}

function activate(action) {
    fadeOut()
}
