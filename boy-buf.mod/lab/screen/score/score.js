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

    const x1 = x - 25
    const x2 = x + 20
    x -= 20
    y += 15
    alignLeft()
    text('shots:', x1, y)
    text('' + ship.score.shots, x2, y)
    y += 10
    text('hits:', x1, y)
    text('' + ship.foe.score.hits, x2, y)
    y += 10
    text('kills:', x1, y)
    text('' + ship.foe.score.lost, x2, y)
    y += 10
    text('energy:', x1, y)
    text('' + ship.foe.score.energy, x2, y)
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
