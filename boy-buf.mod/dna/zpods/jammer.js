const df = {
    name: 'jammer',
    title: 'ECM Jammer',
    tag: 'jammer',
    system: true,
    cost: 100,
    hits: 25,
    effective: .25,
    charge: 35,
}

class jammer extends dna.Pod {

    constructor(st) {
        super(st)
        augment(this, df)
        this.df = df
    }

    isReady() {
        if (this.dead
            || this.hits < this.df.hits * this.df.effective
            || this.charge < this.df.charge) return false
        else return true
    }

    activate() {
        if (this.charge === this.df.charge) {
            this.charge = 0
            log('missile is jammed!')
            return true
        } else {
            return false
        }
    }
}
