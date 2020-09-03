const df = {
    name: 'pod',
    hits: 100,
}

class Pod {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    activate() {}

    turn() {}

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
