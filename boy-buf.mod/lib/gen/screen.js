function screen() {
    // setup gameboy screen resolution
    ctx.width = _._$.env.tune.width
    ctx.height = _._$.env.tune.height
    ctx.canvas.width = _._$.env.tune.width
    ctx.canvas.height = _._$.env.tune.height

    // create sub-screens
    lab.screen.touch('menu')
    augment(lab.screen.menu, dna.trait.hidable)

    lib.gen.design()

    lab.screen.touch('battle', dna.trait.hidable)
    augment(lab.screen.battle, {
        show: function() {
            this.hidden = false
            lab.control.player.bindAll(lab.screen.battle.left)
        }
    })
    lab.screen.touch('score')
    augment(lab.screen.score, dna.trait.hidable)

    augment(lab.screen.title, dna.trait.hidable)
}
