const df = {
    x: 0,
    y: 0,
}

class ShipGrid {

    constructor(st) {
        augment(this, df)
        augment(this, st)
        if (!this.layout) {
            // set default
            this.layout = dna.spec.layout.basic
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

        if (this.layout[ny] && this.layout[ny][nx] > 0) {
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

        const s = 14
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
                const type = this.layout[y][x]
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

        if (this.player) {
            const x = this.target.x
            const y = this.target.y
            stroke(env.style.color.c3)
            rect(x*s, y*s, s, s)
        }

        restore()
    }
}
