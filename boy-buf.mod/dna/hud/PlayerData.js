class PlayerData {

    constructor(st) {
        augment(this, st)
        if (!this.color) this.color = env.style.color.c1
    }

    draw() {
        if (!this.player) return

        save()
        translate(this.x, this.y)

        baseTop()
        alignRight()
        fill(this.color)
        font(env.style.font)

        const x = this.x
        text(this.player.title, x, 2)
        text('$' + this.player.balance, x, 12)

        restore()
    }

    setPlayer(player) {
        this.player = player
    }
}
