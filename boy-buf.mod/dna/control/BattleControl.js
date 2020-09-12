const ACTIVE = 0
const HALT = 1

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
rechargeModes.id = 'recharge'

const targeting = [
    'auto',
    'manual'
]
targeting.id = 'targeting'

const targets = [
    'systems',
    'weapons',
    'shields',
    'reactors',
    'armor',
]
targets.id = 'targets'



class BattleControl {

    constructor(st) {
        augment(this, st)
    }

    installAutopilot(ship) {
        if (!ship.player.human) {
            log('installing autopilot for ' + ship.name + '/' + ship.player.name)
            ship.autoSelect = _.bot.computingCore.autoSelect
            ship.autoPilot = _.bot.computingCore.autoPilot
        }
    }


    startBattle(playerA, playerB) {
        const shipA = playerA.ship
        const shipB = playerB.ship
        if (playerA.hybrid) playerA.human = false
        if (playerB.hybrid) playerB.human = false
        this.installAutopilot(shipA)
        this.installAutopilot(shipB)
        this.turn = 1
        this.status = ACTIVE
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
        lab.control.player.bindAll(this)
    }

    humanTurn(source, target, menu, nextAction) {
        const control = this
        const actions = source.actionsAvailable()
        actions.push({ section: true, title: 'charge mode' })
        actions.push(rechargeModes)
        rechargeModes.current = rechargeModes.indexOf(source.rechargePriority)

        actions.push({ section: true, title: 'target' })
        actions.push(targeting)
        if (source.autotarget) {
            targeting.current = 0
            targets.disabled = false
        } else {
            targeting.current = 1
            targets.disabled = true
        }
        actions.push(targets)
        targets.current = targets.indexOf(source.target)

        actions.push('skip')
        actions.push('yield')

        menu.selectFrom({
            items: actions,
            onSelect: function(selected) {
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
                lab.control.player.bindAll(this)
                
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
            onSwitch: function(switched, i) {
                const val = switched[switched.current]

                switch(switched.id) {
                case 'recharge':
                    source.setRechargePriority(val)
                    break

                case 'targeting':
                    if (val === 'manual') {
                        source.autotarget = false
                        this.items[i+1].disabled = true
                    } else {
                        source.autotarget = true
                        this.items[i+1].disabled = false
                    }
                    break

                case 'targets':
                    source.target = val
                    log(source.name + ' targets ' + val)
                    break
                }
            },
        })
    }

    botTurn(source, target, nextAction) {
        // log('bot action')
        source.autoPilot(target)

        if (!this.endCondition()) {
            setTimeout(nextAction, env.tune.subturnDelay)
        }
    }

    turnA() {
        if (this.status === HALT) return
        const source = this.shipA
        const target = this.shipB
        const control = this
        const next = (() => control.turnB())
        

        source.subTurn()
        if (source.player.human) {
            setTimeout( () => {
                this.humanTurn(source, target, this.leftMenu, next)
            }, env.tune.humanTurnDelay)
        } else {
            this.botTurn(source, target, next)
        }
    }

    turnB() {
        if (this.status === HALT) return
        const source = this.shipB
        const target = this.shipA
        const control = this
        const next = (() => control.nextTurn())

        source.subTurn()
        if (source.player.human) {
            setTimeout( () => {
                this.humanTurn(source, target, this.rightMenu, next)
            }, env.tune.humanTurnDelay)
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

    evo(dt) {
        if (this.shipA && this.shipB) {
            this.shipA.evo(dt)
            this.shipB.evo(dt)
        }
    }

    nextTurn() {
        if (this.status === HALT) return
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

    activate(action) {
        if (action === 6 && !this.shipA.human && !this.shipB.human) {
            this.finishBattle()
        }
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

        if (!A.status && !B.status) {
            A.status = 'draw'
            B.status = 'draw'
        }

        const res = {
            shipA: this.shipA,
            shipB: this.shipB,
        }
        return res
    }

    finishBattle() {
        this.status = HALT
        const activeScreen = this.__
        lab.control.player.unbindAll()
        const scoreData = this.determineWinner()

        lab.vfx.itransit(() => {
            activeScreen.hide()
            trap('score', scoreData)
        }, env.tune.finishBattleDelay)
    }
}
