const Z = 22

function show(data) {
    this.state = 0
    this.hidden = false
    this.data = data
}

function hide() {
    this.hidden = true
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

/*
function activate(action) {
    this.fadeOut()
    sfx.play('use', env.mixer.level.apply)
}
*/
