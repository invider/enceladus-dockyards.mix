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
