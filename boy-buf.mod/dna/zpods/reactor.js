const df = {
    name: 'reactor',
    title: 'Reactor Core',
    tag: 'reactor',
    system: true,
    cost: 100,
    hits: 120,
    output: 25,
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
                    // log(ship.name + '/' + pod.name + ' consumed ' + consumed)
                }
            }
        })
        return input
    }

    turn() {
        let output = floor(this.output * (this.hits/this.df.hits))
        if (output === 0) return
        log(`[${this.ship.name}] reactor output: +${output}`)
        const originalOutput = output

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
        const consumed = originalOutput - leftover

        log(`[${this.ship.name}/${this.name}] consumed ${consumed}/${originalOutput}`)
        this.ship.score.energy += consumed

        if (consumed > 0) {
            const loc = this.ship.visualGrid.cellScreenCoord(this)
            lib.vfx.mintAt('+' + consumed + ' energy', loc.x, loc.y, this.ship.left)
        }
    }
}
