const df = {
    name: 'reactor',
    title: 'Reactor Core',
    system: true,
    cost: 100,
    hits: 250,
    output: 45,
}

class reactor extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    turn() {
        let out = floor(this.output * (this.hits/this.df.hits))
        log('recharging for E' + out)

        this.ship.forEachPod((pod) => {
            if (out > 0) {
                const consumed = pod.recharge(out)
                if (consumed > 0) {
                    out -= consumed
                    log('consumed ' + consumed)
                }
            }
        })

        if (out > 0) log('energy surplus: ' + out)
    }
}
