const rechargeModes = [
    'all',
    'weapons',
    'systems',
    'm-drivers',
    'lasers',
    'shields',
    'jammers',
    'repairs',
]

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
        this.leftPanel.monitor(shipA)
        this.rightPanel.monitor(shipB)

        shipA.chargeForBattle()
        shipB.chargeForBattle()

        this.turnA()
        // or this.turnB() half of the time?
    }

    turnA() {
        const source = this.shipA
        const target = this.shipB
        const control = this
        const actions = this.shipA.actionsAvailable()
        actions.push({ section: true, title: 'charge mode' })
        actions.push(rechargeModes)
        rechargeModes.current = rechargeModes.indexOf(source.rechargePriority)
        actions.push('skip')
        actions.push('yield')
        this.leftMenu.selectFrom(actions,
            function(selected) {
                if (isArray(selected)) {
                    this.right()
                    return
                }
                this.hide()
                
                if (selected === 'yield') {
                    control.finishBattle()
                } else if (selected === 'skip') {
                    // do nothing
                } else {
                    source.takeAction(selected, target)
                }

                setTimeout(() => { control.turnB() }, 1000)
            },
            function(switched) {
                source.setRechargePriority(switched[switched.current])
            }
        )
    }

    turnB() {
        const source = this.shipB
        const target = this.shipA
        const control = this
        const actions = this.shipB.actionsAvailable()
        actions.push(rechargeModes)
        rechargeModes.current = rechargeModes.indexOf(source.rechargePriority)
        actions.push('skip')
        actions.push('yield')
        this.rightMenu.selectFrom(actions,
            function(selected) {
                this.hide()

                if (selected === 'yield') {
                    control.finishBattle()
                } else if (selected === 'skip') {
                    // do nothing
                } else {
                    source.takeAction(selected, target)
                }
                setTimeout(() => { control.nextTurn() }, 1000)
            },
            function(switched) {
                source.setRechargePriority(switched[switched.current])
            }
        )
    }

    nextTurn() {
        this.turn ++
        this.shipA.turn()
        this.shipB.turn()
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
                trap('score')
            },
            fadeout: 2,
        })
    }
}
