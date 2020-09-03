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

        dna.zpods._ls.forEach(pod => {
            pods.push(new pod())
        })
        this.pods = pods
    }

    next() {
        this.current ++
        if (this.current >= this.pods.length) this.current = 0
    }

    prev() {
        this.current --
        if (this.current < 0) this.current = this.pods.length - 1
    }

    place() {
        this.__.control.placePod('laser')
    }

    activate(action) {
        switch(action) {
            case 2: this.prev();  break;
            case 4: this.next();  break;
            case 5: this.place(); break;
        }
    }

    draw() {
        save()
        translate(this.x, this.y)

        fill(env.style.color.c1)
        rect(0, 0, this.w, this.h)

        const pod = this.currentPod()
        alignCenter()
        baseTop()
        font(env.style.font)
        fill(env.style.color.c0)
        text(pod.name, floor(this.w/2), 10)

        restore()
    }

    currentPod() {
        return this.pods[this.current]
    }
}
