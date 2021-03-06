const df = {
    name: 'designer'
}

class Designer {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    compilePods() {
        this.current = 0
        const pods = []
        const price = {}

        dna.zpods._ls.forEach(podCons => {
            const pod = new podCons()
            pods.push(pod)
            price[pod.name] = pod.cost
        })

        // special actions
        pods.push({
            name: 'remove',
            special: true,
        })
        if (!env.opt.autosave) {
            pods.push({
                name: 'save',
                special: true,
            })
        }
        pods.push({
            name: 'download',
            special: true,
        })
        pods.push({
            name: 'build',
            special: true,
        })
        this.pods = pods
        this.price = price
    }

    next() {
        this.current ++
        if (this.current >= this.pods.length) this.current = 0
        sfx.play('select', env.mixer.level.select)
    }

    prev() {
        this.current --
        if (this.current < 0) this.current = this.pods.length - 1
        sfx.play('select', env.mixer.level.select)
    }

    place() {
        const pod = this.currentPod()
        if (pod) {
            this.__.control.placePod(pod)
            sfx.play('use', env.mixer.level.apply)
        }
    }

    activate(action) {
        switch(action) {
            case 2: this.prev();  break;
            case 4: this.next();  break;
            case 5: this.place(); break;
        }
    }

    podPrice(podName) {
        return (this.price[podName] || 0)
    }

    draw() {
        save()
        translate(this.x, this.y)

        //fill(env.style.color.c1)
        //rect(0, 0, this.w, this.h)

        const pod = this.currentPod()
        alignCenter()
        baseTop()
        font(env.style.font)

        if (pod.special) fill(env.style.color.c2)
        else fill(env.style.color.c3)

        let x = floor(this.w/2)
        let y = 10
        text(pod.title || pod.name, x, y)
        y += 14

        if (!pod.special) {
            const s = env.style.cellSize - 2
            const tilex = lib.pods.getTilex(pod.name)
            if (tilex >= 0) {
                const b = 1
                const px = floor(x-s/2)
                fill(env.style.color.c1)
                rect(px-b, y-b, s+2*b, s+2*b)
                res.pods.draw(tilex, px, y, s, s)
            }

            y += 20
            const stat = lib.pods.podStat(pod.name)
            if (stat) {
                fill(env.style.color.c1)
                stat.forEach(line => {
                    text(line, x, y)
                    y += 10
                })
            }
        }

        restore()
    }

    currentPod() {
        return this.pods[this.current]
    }
}
