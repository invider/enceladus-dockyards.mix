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
        fadeIn: env.style.fadeIn,
        hold: .5,
        onFadeOut: function() {
            activeScreen.hide()
            trap('title')
        },
        fadeOut: env.style.fadeOut,
    })
}

function drawPlayerStat(ship, x) {
    alignCenter()
    baseTop()
    fill(env.style.color.c3)
    font(env.style.titleFont)

    let y = 30
    text(ship.player.title, x, y)

    font(env.style.font)
    y += 15
    text(ship.status, x, y)
}

function draw() {
    alignCenter()
    baseTop()
    fill(env.style.color.c3)
    font(env.style.titleFont)
    text('Score', rx(.5), 10)

    this.drawPlayerStat(this.data.shipA, 40)
    this.drawPlayerStat(this.data.shipB, 120)
}

function activate(action) {
    this.fadeOut()
}
