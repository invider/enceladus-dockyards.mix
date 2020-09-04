const df = {
    name: 'pod',
    title: 'pod mk1',
    cost: 10,
    hits: 100,
}

class Pod {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    activate() {}

    turn() {}

    recharge(capacity) {
        if (!this.df || !this.df.charge) return 0

        const need = this.df.charge - this.charge
        if (need > 0 && capacity > 0) {
            if (need > capacity) {
                // take it all!
                this.charge += capacity
                return capacity
            } else {
                this.charge += need
                return need
            }
        }
        return 0
    }

    hit(attack) {
        this.hits -= attack
        if (this.hits < 0) {
            this.hits = 0
            this.kill()
        }
    }

    kill() {
        this.dead = true
    }
}
