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

    mountPod(pod, x, y) {
        pod.x = x
        pod.y = y
        pod.ship = this
        this.pods.push(pod)
        this.grid[y * this.w + x] = pod
    
        // set serial, provide kind and rename
        pod.id = this.pods.length
        pod.kind = pod.name
        pod.name += ' #' + pod.id
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
            if (pod.triggerOn) {
                const trigger = pod.triggerOn()
                if (trigger) {
                    actions[trigger] = true
                }
            }
        })
        return Object.keys(actions)
    }

    takeAction(action, target) {
        let actionPod
        this.pods.forEach(pod => {
            if (pod.triggerOn) {
                const trigger = pod.triggerOn()
                if (trigger === action) {
                    actionPod = pod
                }
            }
        })

        if (actionPod) {
            //log('taking action by ' + actionPod.title)
            if (actionPod.activate) {
                const x = RND(4)
                const y = RND(6)
                actionPod.activate(target, x, y)
            } else {
                log("can't activate " + actionPod.name)
            }
        }
    }

    turn() {
        this.forEachPod((pod) => {
            if (pod.turn) pod.turn()
        })
    }

    hit(attack, type, x, y) {
        const pod = this.killPodAt(x, y)
        if (pod) {
            pod.state2 = 'destroyed in @' + lab.screen.battle.control.turn
            log.out(`hitting ${this.name}->${x}:${y} [${pod.name}]`)
        } else {
            log.out('missed')
        }
    }

    setRechargePriority(mode) {
        if (!mode) return
        this.rechargePriority = mode
    }

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
            if (pod.tag === 'shield') {
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
