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
            this.blueprint = new dna.Blueprint()
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
            case 5: this.apply(); return;
            case 6: this.back();  return;
        }

        const type = this.blueprint.cellType(nx, ny)
        if (type > 0) {
            this.target.x = nx
            this.target.y = ny
            sfx.play('select', env.mixer.level.select)
        }
    }

    apply() {}

    back() {}

    getTilex(pod, POD) {
        let tilex = -1
        switch(pod) {
            case 'free':    tilex = 0; break;
            case 'shell':   tilex = 0; break;
            case 'armor':   tilex = 4; break;
            case 'debris':  tilex = 1; break;
            case 'laser':
                if (!POD || POD.isReady()) tilex = 13
                else tilex = 12
                break

            case 'missile':
                tilex = 8; break;

            case 'jammer':
                if (!POD || POD.isReady()) tilex = 27
                else tilex = 26
                break

            case 'driver':
                if (!POD || POD.isReady()) tilex = 21
                else tilex = 20
                break

            case 'reactor': tilex = 16; break;
            case 'gen':     tilex = 24; break;
            case 'kinetic': tilex = 6; break;
            case 'repair':  tilex = 10; break;
            default:
                tilex = 9;
        }
        return tilex
    }

    drawGrid(layer) {
        const chargedPods = []
        const s = env.style.cellSize
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
                const pod = this.blueprint.podAt(x, y)

                let POD
                let dx = 0
                let dy = 0
                if (this.blueprint.getPod) {
                    POD = this.blueprint.getPod(x, y)
                    if (POD
                            && POD.df
                            && POD.df.charge
                            && POD.charge === POD.df.charge) {
                        chargedPods.push(POD)
                    }
                    if (POD) {
                        dx = floor(POD.dx)
                        dy = floor(POD.dy)
                    }
                }

                if (!POD
                        || (POD && layer === 0 && POD.effect === 0)
                        || (POD && layer === 1 && POD.effect > 0)) {

                    if (pod !== 'x') {
                        // within the ship

                        // fill the floor
                        stroke(env.style.color.c1)
                        rect(x*s, y*s, s, s)

                        stroke(env.style.color.c0)
                        line(x*s, y*s+s-1, x*s+s-1, y*s+s-1)
                        line(x*s+s-1, y*s, x*s+s-1, y*s+s-1)

                        // draw the component
                        const tilex = this.getTilex(pod, POD)
                        if (tilex >= 0) {
                            res.pods.draw(tilex,
                                x*s+.5 + dx, y*s+.5 + dy, s-2, s-2)
                        }
                    }
                }
            }
        }

        if (chargedPods.length > 0) {
            for (let i = 0; i < chargedPods.length; i++) {
                const pod = chargedPods[i]
                stroke(env.style.color.c2)
                rect(pod.x*s, pod.y*s, s, s)
            }
        }
    }

    draw() {
        if (!this.blueprint) return
        save()
        translate(this.x + .5, this.y + .5)

        lineWidth(1)

        this.drawGrid(0)
        this.drawGrid(1)

        // mark target
        if (this.playerId) {
            const x = this.target.x
            const y = this.target.y
            const s = env.style.cellSize
            stroke(env.style.color.c3)
            rect(x*s, y*s, s, s)
        }

        restore()
    }

    setBlueprint(blueprint) {
        this.blueprint = blueprint
        if (blueprint) {
            blueprint.visualGrid = this
        }
    }

    cellScreenCoord(coord) {
        const s = env.style.cellSize
        return {
            x: floor(coord.x * s + this.x + s/2),
            y: floor(coord.y * s + this.y + s/2),
        }
    }
}
