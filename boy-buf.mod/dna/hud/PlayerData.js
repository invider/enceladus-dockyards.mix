class PlayerData {

    constructor(st) {
        augment(this, st)
        if (!this.color) this.color = env.style.color.c1
    }

    draw() {
        if (!this.player) return

        baseTop()
        alignRight()
        fill(this.color)
        font(env.style.font)

        const x = this.x
        const y = this.y
        text(this.player.title, x, y)
        text('$' + this.player.balance, x, y+10)
    }

    setPlayer(player) {
        this.player = player
    }
}
