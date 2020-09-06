class DesignControl {

    constructor(st) {
        this.name = 'control'
        augment(this, st)
    }

    setupDesign(player, blueprint) {
        this.state = 0
        this.player = player
        this.blueprint = blueprint
        this.player.buy(blueprint.estimateCost())
        this.grid.setBlueprint(blueprint)
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

    build() {
        if (this.state > 0) return
        this.state = 1

        this.blueprint.hits = this.blueprint.estimateHits((podName) => {
            return lib.pods.podHits(podName)
        })

        const ship = new dna.Ship(this.blueprint)
        ship.player = this.player
        // TODO create shipB in the second flow
        const shipB = new dna.Ship(this.blueprint)
        shipB.player = lab.playerB

        const control = this
        const activeScreen = this.__
        lab.vfx.transit({
            fadeIn: env.style.fadeIn,
            keep: .5,
            onFadeOut: function() {
                control.unbindAll()
                activeScreen.hide()
                trap('battle', {
                    shipA: ship,
                    shipB: shipB,
                })
            },
            fadeOut: env.style.fadeOut,
        })
    }

    unbindAll() {
        lab.control.player.unbindAll(this.grid)
        lab.control.player.unbindAll(this.designer)
    }
}
