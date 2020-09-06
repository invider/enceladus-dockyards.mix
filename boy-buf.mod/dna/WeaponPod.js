class WeaponPod extends dna.Pod {

    constructor(st) {
        super(st)
    }

    isReady() {
        if (this.dead
            || this.hits < this.df.hits * this.df.effective
            || this.charge < this.df.charge) return false
        else return true
    }

    reactsOn() {
        if (this.isReady()) return this.df.action
    }

    triggersOn(action) {
        return this.reactsOn() === this.df.action
    }
}
