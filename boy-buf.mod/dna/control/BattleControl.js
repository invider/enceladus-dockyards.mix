class BattleControl {

    constructor(st) {
        augment(this, st)
    }

    startBattle(shipA, shipB) {
        this.turn = 1
        this.subturn = 0
        this.shipA = shipA
        this.shipB = shipB
        this.left.setBlueprint(shipA)
        this.right.setBlueprint(shipB)

        shipA.chargeForBattle()
        shipB.chargeForBattle()

        log.dump(shipA.actionsAvailable())
        log.dump(shipB.actionsAvailable())

        this.turnA()
    }

    turnA() {
        const actions = this.shipA.actionsAvailable()
        actions.push('skip')
        actions.push('yield')
        this.leftMenu.selectFrom(actions)
    }

    turnB() {
    }

    nextTurn() {
    }
}
