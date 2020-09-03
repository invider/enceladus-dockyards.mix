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
        apply: function() {
            // TODO place the pod and reduce the balance
            this.__.control.selectPod()
        },
    })

    const designerFrame = design.spawn(dna.hud.Frame, {
        title: 'parts',
        x: ctx.width/2 + 1,
        y: 0,
        w: ctx.width/2 - 2,
        h: ctx.height - 24,
    })
    const designer = design.spawn(dna.hud.Designer, {
        name: 'designer',
        x: designerFrame.x + 2,
        y: designerFrame.y + 12,
        w: designerFrame.w - 4,
        h: designerFrame.h - 16,
    })

    design.spawn(dna.control.DesignControl, {
        grid: grid,
        designer: designer,
    })
}
