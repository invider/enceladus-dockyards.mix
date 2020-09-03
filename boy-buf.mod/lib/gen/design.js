function design() {
    const design = lab.screen.touch('design')
    augment(design, dna.trait.hidable)

    design.spawn(dna.hud.Frame, {
        title: 'blueprint',
        x: 0,
        y: 0,
        w: ctx.width/2 - 2,
        h: ctx.height - 1,
    })
    const grid = design.spawn(dna.hud.ShipGrid, {
        Z: 11,
        name: 'grid',
        x: 4,
        y: 24,
        layout: dna.spec.layout.whale,
    })

    design.spawn(dna.hud.Frame, {
        title: 'parts',
        x: ctx.width/2 + 1,
        y: 0,
        w: ctx.width/2 - 2,
        h: ctx.height - 1,
    })
    const designer = design.spawn(dna.Designer, {
        name: 'designer',
        x: ctx.width/2 + 4,
        y: 16,
    })

    design.spawn(dna.control.DesignControl, {
        grid: grid,
        designer: designer,
    })
}
