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
        this.leftMenu.hide()
        this.rightMenu.hide()

        shipA.name += ' A'
        shipA.chargeForBattle()
        shipB.name += ' B'
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
                    source.status = 'yield'
                    target.status = 'win'
                    control.finishBattle()
                    return
                } else if (selected === 'skip') {
                    // do nothing
                } else {
                    source.takeAction(selected, target)
                }

                if (!control.endCondition()) {
                    setTimeout(() => { control.turnB() }, 1000)
                }
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
        actions.push({ section: true, title: 'charge mode' })
        actions.push(rechargeModes)
        rechargeModes.current = rechargeModes.indexOf(source.rechargePriority)
        actions.push('skip')
        actions.push('yield')
        this.rightMenu.selectFrom(actions,
            function(selected) {
                this.hide()

                if (selected === 'yield') {
                    source.status = 'yield'
                    target.status = 'win'
                    control.finishBattle()
                    return
                } else if (selected === 'skip') {
                    // do nothing
                } else {
                    source.takeAction(selected, target)
                }
                if (!control.endCondition()) {
                    setTimeout(() => { control.nextTurn() }, 1000)
                }
            },
            function(switched) {
                source.setRechargePriority(switched[switched.current])
            }
        )
    }

    endCondition() {
        const a = this.shipA.activeSystems()
        const b = this.shipB.activeSystems()
        if (a === 0 || b === 0) {
            control.finishBattle()
        }
    }

    nextTurn() {
        this.turn ++
        this.shipA.turn()
        this.shipB.turn()
        this.turnA()
    }

    determineWinner() {
        const A = this.shipA
        const B = this.shipB
        const a = A.activeSystems()
        const b = B.activeSystems()
        const ah = A.systemHits()
        const bh = B.systemHits()

        if (a < 0) this.shipA.status = 'destroyed'
        if (b < 0) this.shipB.status = 'destroyed'

        if (A.status === 'destroyed' && !B.status) B.status = 'win'
        if (B.status === 'destroyed' && !A.status) A.status = 'win'

        const res = {
            shipA: this.shipA,
            shipB: this.shipB,
        }
        return res
    }

    finishBattle() {
        const activeScreen = this.__
        lab.control.player.unbindAll()

        const scoreData = this.determineWinner()

        lab.vfx.transit({
            fadeIn: env.style.fadeIn,
            keep: .5,
            onFadeOut: function() {
                activeScreen.hide()
                trap('score', scoreData)
            },
            fadeOut: env.style.fadeOut,
        })
    }
}
