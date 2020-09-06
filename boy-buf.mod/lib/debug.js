function configure() {
    if (_$.env.config.fast) {
        env.style.holdBeforeStart = 0
        env.style.fadeIn = 0
        env.style.fadeOut = 0
        _$.env.tune.fadeKeep = 0
        _$.env.tune.fadeOut = 0
    }
}

function hyperjump() {
    if (_$.env.config.menu) {
        _.trap.attach(function start() {
            log('hyperjump to the menu')
            trap('menu')
        })
        return true
    }

    if (_$.env.config.newgame) {
        _.trap.attach(function start() {
            log('hyperjump to newgame')
            trap('newGame', {
                 playerA: {
                     human: true,
                     budget: 1000,
                 },
                 playerB: {
                     human: false,
                     budget: 1000,
                 },
            })
        })
        return true
    }

    if (_$.env.config.battle) {
        const playerA = lab.spawn(dna.Player, {
            name: 'playerA',
            title: 'Player A',
            human: true,
            balance: 1000,
        })
        const playerB = lab.spawn(dna.Player, {
            name: 'playerB',
            title: 'Player B',
            human: false,
            balance: 1000,
        })
        playerB.prev = playerA
        playerA.next = playerB

        const control = lab.screen.layout.control
        control.autoConstruct(playerA)
        control.autoConstruct(playerB)

        lab.screen.show()
        trap('battle', playerB)

        return true
    }

    return false
}
