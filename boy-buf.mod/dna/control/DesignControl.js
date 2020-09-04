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

    build() {
        if (this.state > 0) return
        this.state = 1

        const ship = new dna.Ship(this.blueprint)
        console.dir(ship)
        const shipB = new dna.Ship(this.blueprint)

        const activeScreen = this.__
        lab.vfx.transit({
            fadein: 1,
            keep: .5,
            onFadeOut: function() {
                activeScreen.hide()
                trap('battle', {
                    shipA: ship,
                    shipB: shipB,
                })
            },
            fadeout: 2,
        })
    }
}
