const Z = 22
let timeout = 0

function evo(dt) {
    if (this.hidden || this.state > 0) return

    if (timeout > 0) {
        timeout -= dt
        if (timeout < 0) this.fadeOut()
    }
}

function show(data) {
    this.state = 0
    this.hidden = false
    this.data = data
    lab.control.player.bindAll(this)
}

function hide() {
    this.hidden = true
    lab.control.player.unbindAll(this)
}

function keep(time) {
    timeout = time
}

function fadeOut() {
    if (this.state) return
    this.state = 1

    lab.control.player.unbindAll(this)
    const activeScreen = this
    lab.vfx.transit({
        fadein: env.style.fadeIn,
        hold: .5,
        onFadeOut: function() {
            activeScreen.hide()
            trap('title')
        },
        fadeout: env.style.fadeOut,
    })
}

function draw() {
    alignCenter()
    baseTop()
    fill(env.style.color.c3)
    font(env.style.titleFont)
    text('Score', rx(.5), 10)
}

function activate(action) {
    this.fadeOut()
}