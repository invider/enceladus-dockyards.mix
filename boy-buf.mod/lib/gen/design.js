function design() {
    const design = lab.screen.touch('design')
    augment(design, dna.trait.hidable, {
        show: function() {
            this.hidden = false
            lab.control.player.bindAll(lab.screen.design)
        }
    })

    design.spawn(dna.Frame, {
        title: 'blueprint',
        x: 0,
        y: 0,
        w: ctx.width/2 - 2,
        h: ctx.height - 1,
    })
    design.spawn(dna.ShipGrid, {
        Z: 11,
        name: 'blueprint',
        x: 4,
        y: 24,
        layout: dna.spec.layout.whale,
    })

    design.spawn(dna.Frame, {
        title: 'parts',
        x: ctx.width/2 + 1,
        y: 0,
        w: ctx.width/2 - 2,
        h: ctx.height - 1,
    })
    design.spawn(dna.Designer, {
        name: 'designer',
        x: ctx.width/2 + 4,
        y: 16,
    })
}
