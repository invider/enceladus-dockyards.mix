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
                const blueprint = new dna.Blueprint({
                    layout: layout,
                })
                blueprints.push(blueprint)
            }
        })

        // create blueprints form blueprint dumps
        dna.spec.blueprints. _ls.forEach(blueprintDump => {
            if (blueprintDump.cost < budget) {
                const blueprint = new dna.Blueprint(blueprintDump)
                blueprint.estimateCost((podName) => {
                    return lib.pods.podCost(podName)
                })
                log('estimated cost for ' + blueprint.name + ': ' + blueprint.cost)
                blueprints.push(blueprint)
            }
        })

        // TODO include existing/stored designs

        this.current = 0
        this.blueprints = blueprints
    }

    selectFor(player) {
        this.player = player
        this.state = 0
        this.compileBlueprints()
        this.__.playerData.setPlayer(player)
        this.sync()
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

    done() {
        if (this.state) return
        this.state = 1
        lab.control.player.unbindAll(this)

        const player = this.player
        const blueprint = this.currentBlueprint()
        lab.vfx.transit({
            fadeIn: env.style.fadeIn,
            hold: .5,
            onFadeOut: function() {
                lab.screen.layout.hide()
                trap('design', {
                    player: player,
                    blueprint: blueprint,
                })
            },
            fadeOut: env.style.fadeOut,
        })
    }

    sync() {
        this.__.grid.setBlueprint(this.currentBlueprint())
    }

    currentPlayer() {
        return this.player
    }

    currentBlueprint() {
        return this.blueprints[this.current]
    }

    activate(action) {
        switch(action) {
            case 2: this.prev(); break;
            case 4: this.next(); break;
            case 5: this.done(); break;
        }
    }
}
