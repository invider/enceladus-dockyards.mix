class DesignControl {

    constructor(st) {
        this.name = 'control'
        augment(this, st)
    }

    designFor(player) {
        this.state = 0
        this.player = player
        this.blueprint = player.blueprint
        this.player.buy(this.blueprint.estimateCost())
        this.grid.setBlueprint(this.blueprint)
        this.playerData.setPlayer(player)

        this.designer.compilePods()

        this.selectPod()
    }

    selectPod() {
        this.__.blueprint.active = false
        this.__.parts.active = true
        lab.control.player.unbindAll(this.grid)
        lab.control.player.bindAll(this.designer)
    }

    placePod(pod) {
        if (!pod) return

        if (pod.name === 'build') {
            this.build()
        } else {
            this.__.parts.active = false
            this.__.blueprint.active = true
            this.grid.pod = pod
            lab.control.player.unbindAll(this.designer)
            lab.control.player.bindAll(this.grid)
        }
    }

    installPod(pod, x, y) {
        if (!pod) return
        if (this.player.buy(pod.cost)) {
            const removedPod = this.removePod(x, y, true)
            this.blueprint.placePod(x, y, pod.name, pod.cost)
            sfx.play('use', env.mixer.level.apply)
        } else {
            sfx.play('denied', env.mixer.level.denied)
        }
    }

    removePod(x, y, silent) {
        const designer = this.designer
        const podName = this.blueprint.removePod(
            x, y, (name) => {
                return designer.podPrice(name)
            })
        if (podName) {
            const price = designer.podPrice(podName)
            this.player.sell(price)
            if (!silent) sfx.play('noisy', env.mixer.level.remove)
        } else {
            if (!silent) sfx.play('denied', env.mixer.level.denied)
        }
    }

    finalizeBlueprint(blueprint) {
        blueprint.hits = blueprint.estimateHits((podName) => {
            return lib.pods.podHits(podName)
        })
    }

    constructShip(player, blueprint) {
        const ship = new dna.Ship(blueprint)
        if (!player.human) {
            // TODO figure out why 2 times?
            log('installing autopilot for ' + ship.name + '/' + player.name)
            ship.autoSelect = _.bot.computingCore.autoSelect
            ship.autoPilot = _.bot.computingCore.autoPilot
        }
        ship.player = player
        player.ship = ship
        return ship
    }

    build() {
        if (this.state > 0) return
        this.state = 1

        this.finalizeBlueprint(this.blueprint)
        const ship = this.constructShip(this.player, this.blueprint)

        const player = ship.player
        const control = this
        const activeScreen = this.__
        lab.vfx.itransit(() => {
            control.unbindAll()
            activeScreen.hide()

            if (player.next) {
                // construction for next player
                trap('layout', player.next)
            } else {
                // ships are ready, prep for the battle!
                trap('battle', player)
            }
        })
    }

    unbindAll() {
        lab.control.player.unbindAll(this.grid)
        lab.control.player.unbindAll(this.designer)
    }
}
