class LayoutControl {

    constructor(st) {
        this.name = 'control'
        augment(this, st)
    }

    compileBlueprints() {
        const blueprints = []

        dna.spec.layout._ls.forEach(layout => {
            blueprints.push(new dna.Blueprint({
                layout: layout,
            }))
        })

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
