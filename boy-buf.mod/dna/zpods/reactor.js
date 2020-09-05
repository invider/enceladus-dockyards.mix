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

    doRecharge(input, filter) {
        const ship = this.ship
        this.ship.forEachPod((pod) => {
            if (filter && !filter(pod)) return
            if (input > 0) {
                const consumed = pod.recharge(input)
                if (consumed > 0) {
                    input -= consumed
                    log(ship.name + '/' + pod.name + ' consumed ' + consumed)
                }
            }
        })
        return input
    }

    turn() {
        let output = floor(this.output * (this.hits/this.df.hits))
        log('recharging for E' + output)

        switch(this.ship.rechargePriority) {
            case 'weapons':
                output = floor(output/2)
                output += this.doRecharge(output, (pod) => (
                    pod.tag === 'laser'
                    || pod.tag === 'missile'
                    || pod.tag === 'driver'
                ))
                break
            case 'systems':
                output = floor(output/2)
                output += this.doRecharge(output, (pod) => (
                    pod.tag !== 'laser'
                    && pod.tag !== 'missile'
                    && pod.tag !== 'driver'
                ))
                break
            case 'm-drivers':
                output = floor(output/2)
                output += this.doRecharge(output, (pod) => pod.tag === 'driver')
                break
            case 'lasers':
                output = floor(output/2)
                output += this.doRecharge(output, (pod) => pod.tag === 'laser')
                break
            case 'shields':
                output = floor(output/2)
                output += this.doRecharge(output, (pod) => pod.tag === 'shield')
                break
            case 'jammers':
                output = floor(output/2)
                output += this.doRecharge(output, (pod) => pod.tag === 'jammer')
                break
            case 'repairs':
                output = floor(output/2)
                output += this.doRecharge(output, (pod) => pod.tag === 'repair')
                break
            case 'all':
                // do nothing
                break
            default:
                throw 'unknown charge mode!'
        }
        // recharge other systems
        const leftover = this.doRecharge(output)

        if (leftover > 0) log('energy surplus: ' + leftover)
    }
}
