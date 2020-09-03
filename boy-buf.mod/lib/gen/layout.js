function layout() {
    const layout = lab.screen.touch('layout', dna.trait.hideAndBind)

    augment(layout, {
        activate: function(action) {
            log('making #' + action)
        }
    })

    layout.spawn(dna.Frame, {
        title: 'layout',
        x: 0,
        y: 0,
        w: ctx.width/2 - 2,
        h: ctx.height - 1,
    })
    layout.spawn(dna.ShipGrid, {
        Z: 11,
        name: 'layout',
        x: 4,
        y: 24,
        layout: dna.spec.layout.whale,
    })
        
}
