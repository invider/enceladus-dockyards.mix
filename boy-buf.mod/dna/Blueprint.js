class Blueprint {

    constructor(st) {
        augment(this, st)
        if (!this.layout) this.layout = dna.spec.layout.basic
    }

    cellType(x, y) {
        return this.layout[y][x]
    }
}
