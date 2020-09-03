function layout() {
    const layout = lab.screen.touch('layout', dna.trait.hideAndBind)

    augment(layout, {
        activate: function(action) {
            this.control.activate(action)
        }
    })

    const W = ctx.width/2 - 2
    const B = floor((ctx.width - W)/2)

    layout.spawn(dna.hud.Frame, {
        title: 'layout',
        x: B,
        y: 0,
        w: W,
        h: ctx.height - 1,
        drawContent: function() {
            const control = lab.screen.layout.control
            const blueprint = control.currentBlueprint()

            const x = floor(this.w/2)
            baseTop()
            alignCenter()
            fill(this.color)
            text(blueprint.name, x, 14)
        }
    })

    const grid = layout.spawn(dna.ShipGrid, {
        Z: 11,
        name: 'grid',
        x: B + 4,
        y: 24,
        layout: dna.spec.layout.whale,
    })

    layout.spawn(dna.hud.LayoutControl, {
        grid: grid,
    })
}
