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
            if (this.pod) {
                if (this.pod.name === 'remove') {
                    const podName = this.blueprint.removePod(
                        this.target.x, this.target.y)
                    if (podName) {
                        const price = this.__.designer.podPrice(podName)
                        this.__.control.player.sell(price)
                        // TODO play remove sfx
                    } else {
                        // TODO play denied sfx
                    }
                } else {
                    if (this.__.control.player.buy(this.pod.cost)) {
                        this.blueprint.placePod(
                            this.target.x,
                            this.target.y,
                            this.pod.name
                        )
                        // TODO play placement sfx
                    } else {
                        // TODO play denied sfx
                    }
                }
            }
        },
        back: function() {
            this.pod = null
            this.__.control.selectPod()
        }
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

    const playerData = design.spawn(dna.hud.PlayerData, {
        name: 'playerData',
        x: ctx.width,
        y: designerFrame.y + designerFrame.h + 4,
        color: env.style.color.c3,
    })

    design.spawn(dna.control.DesignControl, {
        grid: grid,
        designer: designer,
        playerData: playerData,
    })
}
