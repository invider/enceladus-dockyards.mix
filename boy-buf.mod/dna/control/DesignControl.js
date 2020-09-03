class DesignControl {

    constructor(st) {
        this.name = 'control'
        augment(this, st)
    }

    setupDesign(player, blueprint) {
        this.player = player
        this.blueprint = blueprint
        this.player.buy(blueprint.estimateCost())
        this.grid.setBlueprint(blueprint)

        lab.control.player.bindAll(this.grid)
    }
}
