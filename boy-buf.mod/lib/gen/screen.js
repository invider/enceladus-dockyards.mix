function screen() {
    // setup gameboy screen resolution
    ctx.width = _._$.env.tune.width
    ctx.height = _._$.env.tune.height
    ctx.canvas.width = _._$.env.tune.width
    ctx.canvas.height = _._$.env.tune.height

    // create sub-screens
    lab.screen.touch('menu')
    augment(lab.screen.menu, dna.trait.hidable)

    const design = lab.screen.touch('design')
    augment(design, dna.trait.hidable)
    design.spawn(dna.Designer, {
        name: 'designer',
        x: ctx.width/2 + 4,
        y: 4,
    })

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
