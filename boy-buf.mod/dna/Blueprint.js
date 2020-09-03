class Blueprint {

    constructor(st) {
        augment(this, st)
        if (!this.layout) this.layout = dna.spec.layout.basic
        if (!this.name) this.name = this.layout.name
    }

    estimateCost() {
        if (!this.cost) {
            // calculate and buffer the cost
            this.cost = this.layout.cost
            // TODO calculate cost of all included pods
        }
        return this.cost
    }

    space() {
        return this.layout.space
    }

    cellType(x, y) {
        return this.layout[y][x]
    }
}
