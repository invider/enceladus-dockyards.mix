const Z = 21
let timeout = 0

function evo(dt) {
    if (timeout > 0) {
        timeout -= dt
        if (timeout < 0) this.fadeOut()
    }
}

function keep(time) {
    timeout = time
}

function fadeOut() {
    if (this.state) return
    this.state = 1
    lab.control.player.unbindAll(this)
    lab.vfx.transit({
        fadein: 1,
        hold: .5,
        onFadeOut: function() {
            lab.screen.title.hide()
            trap('design')
        },
        fadeout: 2,
    })
}

function draw() {
    alignCenter()
    baseMiddle()
    fill(env.style.color.c3)
    font(env.style.titleFont)
    text('Enceladus Dockyards', rx(.5), ry(.5))

    alignRight()
    baseBottom()
    font(env.style.font)
    text('by Igor Khotin', rx(1)-8, ry(1)-8)
}

function activate(action) {
    this.fadeOut()
}
