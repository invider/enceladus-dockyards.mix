const df = {
    x: 0,
    y: 0,
}

class ShipGrid {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        if (!this.blueprint) {
            // create a default blueprint
            this.blueprint = new dna.Blueprint({
                layout: dna.spec.layout.basic,
            })
        }
        this.target = {
            x: 2,
            y: 3,
        }
    }

    activate(action) {
        let nx = this.target.x
        let ny = this.target.y
        switch(action) {
            case 1: ny--; break;
            case 2: nx--; break;
            case 3: ny++; break;
            case 4: nx++; break;
        }

        const type = this.blueprint.cellType(nx, ny)
        if (type > 0) {
            this.target.x = nx
            this.target.y = ny
        }
    }

    act(action) {
    }

    stop(action) {
    }

    draw() {
        save()
        translate(this.x + .5, this.y + .5)
        
        lineWidth(1)

        const s = env.style.cellSize
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
                const type = this.blueprint.cellType(x, y)
                if (type > 0) {
                    stroke(env.style.color.c1)
                    rect(x*s, y*s, s, s)

                    if (type === 1) {
                        stroke(env.style.color.c2)
                        rect(x*s+6, y*s+6, s-12, s-12)
                    }
                }
            }
        }

        if (this.playerId) {
            const x = this.target.x
            const y = this.target.y
            stroke(env.style.color.c3)
            rect(x*s, y*s, s, s)
        }

        restore()
    }

    setBlueprint(blueprint) {
        this.blueprint = blueprint
    }
}