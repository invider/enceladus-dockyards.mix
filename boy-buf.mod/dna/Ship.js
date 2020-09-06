class Ship {

    constructor(blueprint) {
        this.name = blueprint.name
        this.blueprint = blueprint
        this.w = blueprint.w
        this.h = blueprint.h

        this.grid = []
        this.pods = []

        const podDNA = dna.zpods._dir
        for (let y = 0; y < blueprint.h; y++) {
            for (let x = 0; x < blueprint.w; x++) {
                const podName = blueprint.podAt(x, y)
                const podCons = podDNA[podName]
                if (podCons) {
                    const pod = new podCons()
                    this.mountPod(pod, x, y)
                }
            }
        }
        this.rechargePriority = 'weapons'
    }

    cellType(x, y) {
        return this.blueprint.cellType(x, y)
    }

    podAt(x, y) {
        const pod = this.grid[y*this.w + x]
        if (pod) return (pod.kind || pod.name)
        return this.blueprint.cellAt(x, y)
    }

    forEachPod(fn) {
        this.pods.forEach(pod => {
            if (pod && !pod.dead) fn(pod)
        })
    }

    podsOf(kind) {
        let i = 0
        this.pods.forEach(pod => {
            if (pod.kind === kind) i++
        })
        return i
    }

    getPod(x, y) {
        return this.grid[y*this.w + x]
    }

    mountPod(pod, x, y) {
        pod.x = x
        pod.y = y
        pod.ship = this
        this.pods.push(pod)
        this.grid[y * this.w + x] = pod
    
        // set serial, provide kind and rename
        pod.id = this.pods.length
        pod.kind = pod.name
        pod.name += ' #' + (this.podsOf(pod.kind) + 1)
    }

    killPod(pod) {
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i] === pod) {
                this.grid[i] = null
            }
        }
        const i = this.pods.indexOf(pod)
        if (i >= 0) this.pods.splice(i, 1)
    }

    killPodAt(x, y) {
        const pod = this.grid[y*this.w + x]
        if (!pod) return

        this.grid[y*this.w + x] = null
        const i = this.pods.indexOf(pod)
        this.pods.splice(i, 1)

        return pod
    }

    // raise shields and recharge weapons
    chargeForBattle() {
        this.pods.forEach(pod => {
            if (pod.init) pod.init()
        })
        this.maxHits = this.totalHits()
        this.maxSystemHits = this.systemHits()
        this.maxShields = this.shields()
    }

    actionsAvailable() {
        const actions = {}
        this.pods.forEach(pod => {
            if (pod.reactsOn) {
                const action = pod.reactsOn()
                if (action) {
                    actions[action] = true
                }
            }
        })
        return Object.keys(actions).sort()
    }

    takePodAction(pod, target) {
        if (pod.activate) {
            //log(`activating ${pod.name} against ${target.name}`)
            const cell = this.autoTarget(target)
            pod.activate(target, cell.x, cell.y)
        } else {
            log("can't activate " + pod.name)
        }
    }

    takeAction(action, target) {
        //log('action: ' + action)
        const pods = this.pods.filter(pod => pod.triggersOn && pod.triggersOn(action))

        if (pods.length === 0) {
            log('no pods to take action [' + action + ']!')
        } else {
            if (action === 'lasers') {
                // volley fire!
                const ship = this
                pods.forEach(pod => ship.takePodAction(pod, target))
            } else {
                const pod = _$.lib.math.rnde(pods)
                //log('selected ' + pod.name)
                this.takePodAction(pod, target)
            }
        }
        /*
        this.pods.forEach(pod => {
            if (pod.triggerOn) {
                const trigger = pod.triggerOn()
                if (trigger === action) {
                    actionPod = pod
                }
            }
        })
        */

    }

    autoTarget(target, goal) {
        const pods = target.pods.filter(t => !t.dead && t.system)
        return _$.lib.math.rnde(pods)
    }

    turn() {
        this.forEachPod((pod) => {
            if (pod.turn) pod.turn()
        })
    }

    hit(attack, x, y) {
        const pod = this.getPod(x, y)
        if (pod) {
            log('hitting ' + pod.name)
            pod.hit(attack)
        } else {
            log('attack missed!')
        }
        /*
        const pod = this.killPodAt(x, y)
        if (pod) {
            pod.state2 = 'destroyed in @' + lab.screen.battle.control.turn
            log.out(`hitting ${this.name}->${x}:${y} [${pod.name}]`)
        } else {
            log.out('missed')
        }
        */
    }

    shieldFromLaser(attack) {
        this.pods.forEach(pod => {
            if (pod.tag === 'shield' && pod.charge > 0) {
                // reduce attack
                if (attack < pod.charge) {
                    pod.charge -= attack
                    attack = 0
                    log('laser is deflected by ' + pod.name)
                } else {
                    attack -= pod.charge
                    pod.charge = 0
                    log(pod.name + ' is disabled by the laser')
                }
            }
        })
        return attack
    }

    armorFromDriver(attack, x, y) {
        // armor in the area
        const sx = x - 1
        const sy = y - 1
        const fx = x + 1
        const fy = y + 1
        this.pods.forEach(pod => {
            if (pod.tag === 'armor' && pod.hits > 0
                    && pod.x >= sx && pod.x <= fx
                    && pod.y >= sy && pod.y <= fy) {
                // found armor in the area, reduce attack
                if (attack < pod.hits) {
                    pod.hits -= attack
                    attack = 0
                    log('mass driver is deflected by ' + pod.name)
                } else {
                    attack -= pod.hits
                    pod.hits = 0
                    pod.ship.killPod(pod)
                    log(pod.name + ' is destroyed by mass driver')
                }
            }
        })
        return attack
    }

    incoming(weapon, attack, x, y) {
        log(`[${this.name}] => incoming [${weapon.name}](${attack})`)
        if (weapon.tag === 'laser') {
            attack = this.shieldFromLaser(attack)
            log('laser attack left after shields: ' + attack)

            if (attack > 0) {
                const dx = RND(2) - 1
                const dy = RND(2) - 1
                log('laser delta: ' + dx + ':' + dy)
                this.hit(attack, x + dx, y + dy)
            }
        } else if (weapon.tag === 'driver') {
            attack = this.armorFromDriver(attack, x, y)
            log('driver attack left: ' + attack)

            if (attack > 0) {
                log('hitting cells at ' + x + ':' + y)
                this.hit(floor(attack * .4), x, y)
                this.hit(floor(attack * .15), x-1, y)
                this.hit(floor(attack * .15), x+1, y)
                this.hit(floor(attack * .15), x, y-1)
                this.hit(floor(attack * .15), x, y+1)
            }
        }
    }

    setRechargePriority(mode) {
        if (!mode) return
        this.rechargePriority = mode
    }

    // ******************************************
    // stat

    totalHits() {
        let hits = 0
        this.pods.forEach(pod => hits += pod.hits)
        return hits
    }

    systemHits() {
        let hits = 0
        this.pods.forEach(pod => {
            if (pod.system) {
                hits += pod.hits
            }
        })
        return hits
    }

    currentCharge() {
        let charge = 0
        this.pods.forEach(pod => {
            if (pod.df.charge) {
                charge += pod.charge
            }
        })
        return charge
    }

    maxCharge() {
        let charge = 0
        this.pods.forEach(pod => {
            if (pod.df.charge) {
                charge += pod.df.charge
            }
        })
        return charge
    }

    shields() {
        let charge = 0
        this.pods.forEach(pod => {
            if (pod.tag === 'shield' || pod.tag === 'jammer') {
                charge += pod.charge
            }
        })
        return charge
    }

    weaponsCharge() {
        let charge = 0
        this.pods.forEach(pod => {
            if (pod.tag === 'laser' || pod.tag === 'driver') {
                charge += pod.charge
            }
        })
        return charge
    }

    weaponsMaxCharge() {
        let charge = 0
        this.pods.forEach(pod => {
            if (pod.tag === 'laser' || pod.tag === 'driver') {
                charge += pod.df.charge
            }
        })
        return charge
    }

    activeSystems() {
        let systems = 0
        this.pods.forEach(pod => {
            if (pod.system) {
                const disableHits = floor(pod.df.hits * env.tune.disableHits)
                if (pod.hits > disableHits) systems ++
            }
        })
        return systems
    }
}
