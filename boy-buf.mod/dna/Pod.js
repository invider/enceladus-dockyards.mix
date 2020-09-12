const SPEED = 100
const TIME = .05
const VTIME = .03

const df = {
    name: 'pod',
    title: 'pod mk1',
    cost: 10,
    hits: 100,
    dx: 0,
    dy: 0,

    effect: 0,
    times: 0,
    timer: 0,
}

function toZero(val, delta) {
    if (val < 0) {
        val += delta
        if (val > 0) val = 0
    } else if (val > 0) {
        val -= delta
        if (val < 0) val = 0
    }
    return val
}

class Pod {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    init() {
        this.hits = this.df.hits
        if (this.df.charge) this.charge = this.df.charge
        if (this.df.shots) this.shots = this.df.shots
    }

    activate() {}

    turn() {}

    recharge(capacity) {
        if (!this.df || !this.df.charge) return 0

        const need = this.df.charge - this.charge
        if (need > 0 && capacity > 0) {
            if (need > capacity) {
                // take it all!
                this.charge += capacity
                return capacity
            } else {
                this.charge += need
                return need
            }
        }
        return 0
    }

    hit(attack) {
        if (attack <= 0) return
        if (attack > this.hits) attack = this.hits

        this.hits -= attack
        if (this.hits <= 0) {
            this.hits = 0
            this.kill()
            log(`${this.name} is destroyed`)
        }
        const loc = this.ship.visualGrid.cellScreenCoord(this)

        setTimeout(() => {
            lib.vfx.hintAt('-' + attack + ' hits', loc.x, loc.y)
            lib.vfx.debris(loc.x, loc.y)
            sfx.play('burn', env.mixer.level.burn)
            this.shake()
        }, 300 + RND(700))
    }

    repair(hits) {
        if (this.dead || this.hits === 0 || hits <= 0) return
        if (this.hits === this.df.hits) return // already fixed

        let fix = this.df.hits - this.hits
        if (fix > hits) fix = hits

        this.hits += fix
        hits -= fix

        const loc = this.ship.visualGrid.cellScreenCoord(this)
        setTimeout(() => {
            lib.vfx.hintAt('+' + fix + ' hits', loc.x, loc.y, env.style.color.c2)
            lib.vfx.debris(loc.x, loc.y)
            sfx.play('noisy', env.mixer.level.repair)
            this.shake()
        }, 1200)

        return hits
    }

    shake() {
        this.effect = 3
        this.times  = 5
        this.timer  = TIME
    }

    vibrate() {
        this.effect = 1
        this.times  = 5
        this.timer  = VTIME
    }

    evo(dt) {
        if (this.effect) {
            this.timer -= dt
            if (this.timer < 0) {
                this.times --

                if (this.times === 0) {
                    this.effect = 9

                } else {
                    this.timer = 2*TIME
                    switch(this.effect) {
                        case 1: this.effect = 2; break;
                        case 2: this.effect = 1; break;
                        case 3: this.effect = 4; break;
                        case 4: this.effect = 3; break;
                    }
                }

            } else {
                switch(this.effect) {
                    case 1: this.dy -= dt * SPEED; break;
                    case 2: this.dy += dt * SPEED; break;
                    case 3: this.dx -= dt * SPEED; break;
                    case 4: this.dx += dt * SPEED; break;

                    case 9:
                        this.dx = toZero(this.dx, dt * SPEED)
                        this.dy = toZero(this.dy, dt * SPEED)
                        if (this.dx === 0 && this.dy === 0) {
                            this.effect = 0
                        }
                        break
                }
            }
        }
    }

    isDamaged() {
        console.log(this.name)
        return (this.hits < this.df.hits)
    }

    kill() {
        this.dead = true
        this.ship.killPod(this)
        this.ship.mountPod(
            new dna.ypods.DebrisPod(), this.x, this.y)
    }
}
