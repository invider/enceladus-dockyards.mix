const Z = 21
let timeout = 0

function evo(dt) {
    if (timeout > 0) {
        timeout -= dt
        if (timeout < 0) this.fadeOut()
    }
}

function keep(time) {
    this.state = 0
    timeout = time
}

function fadeOut() {
    if (this.state) return
    this.state = 1

    lab.control.player.unbindAll(this)

    const activeScreen = this
    lab.vfx.itransit(() => {
        activeScreen.hide()
        trap('menu')
    })
}

function draw() {
    alignCenter()
    baseMiddle()
    fill(env.style.color.c3)
    font(env.style.titleFont)
    text(env.msg.gameTitle, rx(.5), ry(.5))

    alignRight()
    baseBottom()
    font(env.style.font)
    text('by Igor Khotin', rx(1)-8, ry(1)-8)
}

function activate(action) {
    this.fadeOut()
    sfx.play('use', env.mixer.level.apply)
}
