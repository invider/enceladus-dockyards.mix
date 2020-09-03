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

    next() {
        this.current ++
        if (this.current >= this.blueprints.length) {
            this.current = 0
        }
        this.sync()
    }

    prev() {
        this.current --
        if (this.current < 0) {
            this.current = this.blueprints.length - 1
        }
        this.sync()
    }

    sync() {
        this.__.grid.setBlueprint(this.currentBlueprint())
    }

    currentBlueprint() {
        return this.blueprints[this.current]
    }

    activate(action) {
        switch(action) {
            case 2: this.prev(); break;
            case 4: this.next(); break;
        }
    }
}
