function layout() {
    const layout = lab.screen.touch('layout', dna.trait.hideAndBind)

    augment(layout, {
        activate: function(action) {
            this.control.activate(action)
        }
    })

    const W = ctx.width/2 - 2
    const B = floor((ctx.width - W)/2)

    layout.spawn(dna.Frame, {
        title: 'layout',
        x: B,
        y: 0,
        w: W,
        h: ctx.height - 1,
    })
    const grid = layout.spawn(dna.ShipGrid, {
        Z: 11,
        name: 'layout',
        x: B + 4,
        y: 24,
        layout: dna.spec.layout.whale,
    })

    layout.spawn(dna.hud.LayoutControl, {
        grid: grid,
    })
}
