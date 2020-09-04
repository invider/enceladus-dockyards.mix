class BattleControl {

    constructor(st) {
        augment(this, st)
    }

    startBattle(shipA, shipB) {
        this.shipA = shipA
        this.shipB = shipB
        this.left.setBlueprint(shipA)
        this.right.setBlueprint(shipB)

        shipA.chargeForBattle()
        shipB.chargeForBattle()

        log.dump(shipA.actionsAvailable())
        log.dump(shipB.actionsAvailable())
    }
}
