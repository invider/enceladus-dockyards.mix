const df = {
    x: 0,
    y: 0,
    r: 8,
    speed: -120,
}

class Projectile {

    constructor(st) {
        augment(this, df)
        augment(this, st) 
    }

    evo(dt) {
        this.y += this.speed * dt
        if (this.y < -this.r) {
            this.kill()
        }
    }

    draw() {
        save()
        if (this.type === 'missile') {
            const s = env.style.cellSize - 2
            const x = floor(this.x - s/2)
            const y = floor(this.y - s/2)
            res.pods.draw(32, x, y, s, s)

        } else {
            translate(-.5, 0)

            if (this.type === 'driver') lineWidth(2)
            else lineWidth(1)

            stroke(env.style.color.c3)
            const x = floor(this.x)
            const y = floor(this.y-this.r)
            line(x, y, x, y + 2*this.r)
        }
        restore()
    }

    kill() {
        this.__.detach(this)
    }
}
