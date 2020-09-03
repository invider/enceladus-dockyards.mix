class LayoutData {

    constructor(st) {
        augment(this, st)
        if (!this.color) this.color = env.style.color.c1
    }

    draw() {
        save()
        translate(this.x, this.y)

        const control = lab.screen.layout.control
        const player = control.currentPlayer()
        const blueprint = control.currentBlueprint()

        baseTop()
        alignRight()
        fill(this.color)
        font(env.style.font)

        const x = this.x
        text(player.title, x, 2)
        text('$' + player.balance, x, 12)

        restore()
    }
}
