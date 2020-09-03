class DesignControl {

    constructor(st) {
        this.name = 'control'
        augment(this, st)
    }

    compilePods() {
    }

    setupDesign(player, blueprint) {
        this.player = player
        this.blueprint = blueprint
        this.player.buy(blueprint.estimateCost())
        this.grid.setBlueprint(blueprint)

        this.compilePods()

        this.selectPod()
    }

    selectPod() {
        this.__.blueprint.active = false
        this.__.parts.active = true
        lab.control.player.unbindAll(this.grid)
        lab.control.player.bindAll(this.designer)
    }

    placePod(pod) {
        this.__.parts.active = false
        this.__.blueprint.active = true
        lab.control.player.unbindAll(this.designer)
        lab.control.player.bindAll(this.grid)
    }
}
