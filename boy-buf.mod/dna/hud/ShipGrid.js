const df = {
    x: 0,
    y: 0,
    timer: 0,
    targetPeriod:  .8,
    targetShift:   4,
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
            case 1:
                ny--
                if (this.blueprint.cellType(nx, ny) === 0) nx--
                if (this.blueprint.cellType(nx, ny) === 0) nx += 2
                break
            case 2:
                nx--
                if (this.blueprint.cellType(nx, ny) === 0) ny--
                if (this.blueprint.cellType(nx, ny) === 0) ny += 2
                break
            case 3:
                ny++
                if (this.blueprint.cellType(nx, ny) === 0) nx++
                if (this.blueprint.cellType(nx, ny) === 0) nx -= 2
                break
            case 4:
                nx++
                if (this.blueprint.cellType(nx, ny) === 0) ny++
                if (this.blueprint.cellType(nx, ny) === 0) ny -= 2
                break
            case 5: if (this.apply) this.apply(); return;
            case 6: if (this.back) this.back();  return;
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

    drawGrid(layer) {
        const chargedPods = []
        const s = env.style.cellSize

        lineWidth(1)
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

                        if (!POD || !POD.hidden) {
                            // draw the component
                            const tilex = lib.pods.getTilex(pod, POD)
                            if (tilex >= 0) {
                                res.pods.draw(tilex,
                                    x*s+.5 + dx, y*s+.5 + dy, s-2, s-2)
                            }
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

    drawTarget() {
        const x = this.target.x
        const y = this.target.y
        const s = env.style.cellSize

        const t = 1-(this.timer % this.targetPeriod)/this.targetPeriod
        const u = floor(t * this.targetShift)

        lineWidth(1)
        stroke(env.style.color.c3)
        //rect(x*s-u, y*s-u, s-1 + 2*u, s-1 + 2*u)

        const w = 4.5
        const x1 = x*s - u
        const x2 = x*s + s-1 + u
        const y1 = y*s - u
        const y2 = y*s + s-1 + u

        line(x1-.5, y1, x1+w, y1  )
        line(x1, y1-.5, x1,   y1+w)

        line(x2+.5, y1, x2-w, y1  )
        line(x2, y1-.5, x2,   y1+w)

        line(x1-.5, y2, x1+w, y2  )
        line(x1, y2+.5, x1,   y2-w)

        line(x2+.5, y2, x2-w, y2  )
        line(x2, y2+.5, x2,   y2-w)
    }

    draw() {
        if (!this.blueprint) return
        save()
        translate(this.x + .5, this.y + .5)

        this.drawGrid(0)
        this.drawGrid(1)
        if (this.playerId) this.drawTarget()

        restore()
    }

    evo(dt) {
        this.timer += dt
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
