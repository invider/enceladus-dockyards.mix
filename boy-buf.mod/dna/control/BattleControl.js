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

    startBattle(playerA, playerB) {
        const shipA = playerA.ship
        const shipB = playerB.ship
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
        this.__.vfx.hidden = false

        shipA.name += ' A'
        shipA.chargeForBattle()
        shipB.name += ' B'
        shipB.chargeForBattle()

        this.turnA()
        // or this.turnB() half of the time?
    }

    humanTurn(source, target, menu, nextAction) {
        const control = this
        const actions = source.actionsAvailable()
        actions.push({ section: true, title: 'charge mode' })
        actions.push(rechargeModes)
        rechargeModes.current = rechargeModes.indexOf(source.rechargePriority)
        actions.push('skip')
        actions.push('yield')

        menu.selectFrom(actions,
            function(selected) {
                let skip = false

                if (this.hidden) {
                    this.hidden = false
                    return
                }

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
                    source.skipped ++
                    skip = true
                    // do nothing

                } else {
                    setTimeout(() => {
                        //source.takeAction(selected, target)
                        source.launch(selected, target)
                    }, env.tune.launchDelay)
                }

                if (!control.endCondition()) {
                    if (skip) setTimeout(nextAction, env.tune.turnSkipDelay)
                    else setTimeout(nextAction, env.tune.subturnDelay)
                }
            },
            function(switched) {
                source.setRechargePriority(switched[switched.current])
            }
        )
    }

    botTurn(source, target, nextAction) {
        log('bot action')
        source.autoPilot(target)

        if (!this.endCondition()) {
            setTimeout(nextAction, env.tune.subturnDelay)
        }
    }

    turnA() {
        const source = this.shipA
        const target = this.shipB
        const control = this
        const next = (() => control.turnB())

        if (source.player.human) {
            this.humanTurn(source, target, this.leftMenu, next)
        } else {
            this.botTurn(source, target, next)
        }
    }

    turnB() {
        const source = this.shipB
        const target = this.shipA
        const control = this
        const next = (() => control.nextTurn())

        if (source.player.human) {
            this.humanTurn(source, target, this.rightMenu, next)
        } else {
            this.botTurn(source, target, next)
        }
    }

    endCondition() {
        if (this.shipA.skipped >= 5 && this.shipB.skipped >= 5) {
            this.shipA.status = 'draw'
            this.shipB.status = 'draw'
            this.finishBattle()
            return true
        }
        
        const as = this.shipA.activeSystems()
        const aw = this.shipA.activeWeapons()
        const bs = this.shipB.activeSystems()
        const bw = this.shipB.activeWeapons()
        if (as === 0 || as === 0 || bs === 0 || bw === 0) {
            this.finishBattle()
            return true
        }
        return false
    }

    nextTurn() {
        log('--------------')
        log('finishing turn')
        this.shipA.turn()
        this.shipB.turn()
        this.turn ++
        log('====================')
        log('Turn: ' + this.turn)
        log('====================')

        this.turnA()
    }

    determineWinner() {
        const A = this.shipA
        const B = this.shipB

        if (!A.status && !B.status) {
            const as = A.activeSystems()
            const aw = A.activeWeapons()
            const bs = B.activeSystems()
            const bw = B.activeWeapons()
            const ah = A.systemHits()
            const bh = B.systemHits()

            if (as === 0 || aw === 0) this.shipA.status = 'destroyed'
            if (bs === 0 || bw === 0) this.shipB.status = 'destroyed'

            if (A.status === 'destroyed' && !B.status) B.status = 'win'
            if (B.status === 'destroyed' && !A.status) A.status = 'win'
        }

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

        lab.vfx.itransit(() => {
            activeScreen.hide()
            trap('score', scoreData)
        })
    }
}
