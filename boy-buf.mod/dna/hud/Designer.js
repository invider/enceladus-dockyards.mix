const df = {
    name: 'designer'
}

class Designer {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    place() {
        this.__.control.placePod('laser')
    }

    activate(action) {
        switch(action) {
            case 5: this.place(); break;
        }
    }

    draw() {
        save()
        translate(this.x, this.y)

        fill(env.style.color.c1)
        rect(0, 0, this.w, this.h)

        restore()
    }
}
