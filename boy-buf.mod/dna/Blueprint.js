class Blueprint {

    constructor(st) {
        augment(this, st)
        if (!this.layout) this.layout = dna.spec.layout.basic
        if (!this.name) this.name = this.layout.name
    }

    estimateCost() {
        // TODO calculate cost of all included pods
        return this.layout.cost
    }

    cellType(x, y) {
        return this.layout[y][x]
    }
}
