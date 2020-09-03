class LayoutControl {

    constructor(st) {
        this.name = 'control'
        augment(this, st)
    }

    compileBlueprints() {
        const blueprints = []
        const budget = this.player.balance

        // create a blueprint for each layout available
        dna.spec.layout._ls.forEach(layout => {
            if (layout.cost < budget) {
                blueprints.push(new dna.Blueprint({
                    layout: layout,
                }))
            }
        })

        // TODO include existing/stored designs

        this.current = 0
        this.blueprints = blueprints
    }

    selectFor(player) {
        this.player = player
        this.compileBlueprints()
    }

    activate(action) {
        log('more #' + action)
    }
}
