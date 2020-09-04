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

        this.turnA()
        // or this.turnB()?
    }

    turnA() {
        const control = this
        const actions = this.shipA.actionsAvailable()
        actions.push('skip')
        actions.push('yield')
        this.leftMenu.selectFrom(actions, function(selected) {
            this.hide()
            
            if (selected === 'yield') {
                control.finishBattle()
            } else if (selected === 'skip') {
                // do nothing
            } else {
                log('fire ' + selected)
            }
            control.turnB()
        })
    }

    turnB() {
        const control = this
        const actions = this.shipB.actionsAvailable()
        actions.push('skip')
        actions.push('yield')
        this.rightMenu.selectFrom(actions, function(selected) {
            this.hide()

            if (selected === 'yield') {
                control.finishBattle()
            } else if (selected === 'skip') {
                // do nothing
            } else {
                log('fire ' + selected)
            }
            control.nextTurn()
        })
    }

    nextTurn() {
        this.turn ++
        this.turnA()
    }

    finishBattle() {
        const activeScreen = this.__
        lab.control.player.unbindAll()
        lab.vfx.transit({
            fadein: 1,
            keep: .5,
            onFadeOut: function() {
                activeScreen.hide()
                trap('newGame')
            },
            fadeout: 2,
        })
    }
}
