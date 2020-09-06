class LayoutControl {

    constructor(st) {
        this.name = 'control'
        augment(this, st)
    }

    compileBlueprints(player) {
        const readyBlueprints = []
        const readyBlueprintsMap = {}
        const blueprints = []
        const budget = player.balance

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
                blueprints.push(blueprint)
                readyBlueprints.push(blueprint)
                readyBlueprintsMap[blueprint.name] = blueprint
            }
        })

        // TODO include existing/stored designs

        this.current = 0
        this.blueprints = blueprints
        this.readyBlueprints = readyBlueprints
        this.readyBlueprintsMap = readyBlueprintsMap
    }

    selectFor(player) {
        this.player = player
        this.state = 0
        this.compileBlueprints(player)

        if (player.human) {
            this.__.playerData.setPlayer(player)
            this.sync()
            this.__.show()
        } else {
            this.selectForBot(player)
        }
    }

    autoConstruct(player, blueprintName) {
        let blueprint
        this.compileBlueprints(player)
        if (!blueprintName) {
            blueprint = _.bot.selectBlueprint(player, this.readyBlueprints)
            log('bot selected a blueprint ' + blueprint.name
                + ' for ' + player.name)
        } else {
            blueprint = this.readyBlueprintsMap[blueprintName]
            if (!blueprint) throw `can't find blueprint [${blueprintName}]`
        }
        player.blueprint = blueprint
        lab.screen.design.control.constructShip(player, blueprint)
    }

    selectForBot(player) {
        const blueprint = _.bot.selectBlueprint(player, this.readyBlueprints)
        player.blueprint = blueprint
        log('bot selected a blueprint ' + blueprint.name + ' for ' + player.name)
        lab.screen.design.control.constructShip(player, blueprint)
        
        const control = this
        lab.vfx.transit({
            fadeIn: env.style.fadeIn,
            keep: .5,
            onFadeOut: function() {
                if (player.next) {
                    // construction for next player
                    trap('layout', player.next)
                } else {
                    // ships are ready, prep for the battle!
                    trap('battle', player)
                }
            },
            fadeOut: env.style.fadeOut,
        })
    }

    next() {
        this.current ++
        if (this.current >= this.blueprints.length) {
            this.current = 0
        }
        this.sync()
        sfx.play('select', env.mixer.level.select)
    }

    prev() {
        this.current --
        if (this.current < 0) {
            this.current = this.blueprints.length - 1
        }
        this.sync()
        sfx.play('select', env.mixer.level.select)
    }

    done() {
        if (this.state) return
        this.state = 1
        lab.control.player.unbindAll(this)

        const player = this.player
        const blueprint = this.currentBlueprint()
        player.blueprint = blueprint

        lab.vfx.transit({
            fadeIn: env.style.fadeIn,
            hold: .5,
            onFadeOut: function() {
                lab.screen.layout.hide()
                trap('design', player)
            },
            fadeOut: env.style.fadeOut,
        })
        sfx.play('apply', env.mixer.level.apply)
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
