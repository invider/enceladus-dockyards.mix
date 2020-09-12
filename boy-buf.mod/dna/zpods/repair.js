const df = {
    name: 'repair',
    title: 'Repair Bot',
    tag: 'repair',
    system: true,
    hits: 40,
    cost: 60,
    charge: 30,
}

class repair extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    turn() {
        if (this.charge === 0) return

        const pods = this.ship.damagedPods()
        if (pods.length > 0) {
            const pod = lib.math.rnde(pods)
            log('repairing ' + pod.name + ' with +' + this.charge)
            this.charge = pod.repair(this.charge)
        }
    }
}
