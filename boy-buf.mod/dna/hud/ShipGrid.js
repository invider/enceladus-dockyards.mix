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

    draw() {
        save()
        translate(this.x + .5, this.y + .5)
        
        lineWidth(1)


        const chargedPods = []
        const s = env.style.cellSize
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
                /*
                const type = this.blueprint.cellType(x, y)
            
                if (type > 0) {
                    stroke(env.style.color.c1)
                    rect(x*s, y*s, s, s)

                    if (type === 1) {
                        stroke(env.style.color.c2)
                        rect(x*s+6, y*s+6, s-12, s-12)
                    }
                }
                */

                const pod = this.blueprint.podAt(x, y)
                let POD
                if (this.blueprint.getPod) {
                    POD = this.blueprint.getPod(x, y)
                    if (POD && POD.df.charge && POD.charge === POD.df.charge) {
                        chargedPods.push(POD)
                    }
                }

                if (pod !== 'x') {
                    stroke(env.style.color.c1)
                    rect(x*s, y*s, s, s)

                    if (pod === 'shell') {
                        //stroke(env.style.color.c2)
                        //rect(x*s+6, y*s+6, s-12, s-12)
                    } else if (pod === 'laser') {
                        stroke(env.style.color.c2)
                        line(x*s+7, y*s+1, x*s+7, y*s+13)
                    } else if (pod === 'missile') {
                        stroke(env.style.color.c2)
                        line(x*s+5, y*s+1, x*s+5, y*s+13)
                        line(x*s+8, y*s+1, x*s+8, y*s+13)
                    } else if (pod === 'armor') {
                        stroke(env.style.color.c2)
                        rect(x*s+2, y*s+2, s-4, s-4)
                    } else if (pod !== 'free') {
                        stroke(env.style.color.c1)
                        rect(x*s+2, y*s+2, s-4, s-4)
                    }

                }
            }
        }


        // mark target
        if (this.playerId) {
            const x = this.target.x
            const y = this.target.y
            stroke(env.style.color.c3)
            rect(x*s, y*s, s, s)
        } else if (chargedPods.length > 0) {
            for (let i = 0; i < chargedPods.length; i++) {
                const pod = chargedPods[i]
                stroke(env.style.color.c2)
                rect(pod.x*s, pod.y*s, s, s)
            }
        }

        restore()
    }

    setBlueprint(blueprint) {
        this.blueprint = blueprint
        this.blueprint.visualGrid = this
    }

    cellScreenCoord(coord) {
        const s = env.style.cellSize
        return {
            x: floor(coord.x * s + this.x + s/2),
            y: floor(coord.y * s + this.y + s/2),
        }
    }
}
