function configure() {
    // debug config
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
    }
    if (_$.env.config.menu) {
        _.trap.attach(function start() {
            log('hyperjump to the menu')
            trap('menu')
        })
    }

    if (_$.env.config.fast) {
        env.style.holdBeforeStart = 0
        env.style.fadeIn = 0
        env.style.fadeOut = 0
        _$.env.tune.fadeKeep = 0
        _$.env.tune.fadeOut = 0
    }
}
