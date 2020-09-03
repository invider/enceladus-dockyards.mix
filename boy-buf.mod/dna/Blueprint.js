class Blueprint {

    constructor(st) {
        augment(this, st)
        if (!this.layout) this.layout = dna.spec.layout.basic
        if (!this.grid) this.fillGrid()
        if (!this.name) this.name = this.layout.name
    }

    fillGrid() {
        const h = this.layout.length
        const w = this.layout[0].length
        const grid = []

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const type = this.layout[y][x]

                let cell = 'x'
                if (type === 1) cell = 'shell'
                else if (type === 2) cell = 'free'
                grid[y*w + x] = cell
            }
        }
        this.w = w
        this.h = h
        this.grid = grid

        this.grid[27] = 'laser'
        this.grid[28] = 'missile'
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
        if (!this.layout[y]) return 0
        return this.layout[y][x]
    }

    podAt(x, y) {
        return (this.grid[y * this.w + x] || 'x')
    }

    placePod(x, y, pod) {
        if (x < 0 || x >= this.w) return
        if (y < 0 || y >= this.h) return
        this.grid[y * this.w + x] = pod
    }
}
