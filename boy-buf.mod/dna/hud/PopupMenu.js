const df = {
    x: 0,
    y: 0,
    w: 80,
    h: 40,
    step: 10,
    current: 0,
}
class PopupMenu {

    constructor(st) {
        this.background = env.style.color.c1
        this.color = env.style.color.c3
        this.bcolor = env.style.color.c0
        this.acolor = env.style.color.c0
        this.bacolor = env.style.color.c3
        augment(this, df)
        augment(this, st)

        this.items = ['one', 'two', 'three']
    }

    show() {
        this.hidden = false
        lab.control.player.bindAll(this)
    }

    hide() {
        this.hidden = true
        lab.control.player.unbindAll(this)
    }

    selectFrom(items, onSelect) {
        this.current = 0
        this.items = items
        this.onSelect = onSelect
        this.show()
    }

    next() {
        this.current ++
        if (this.current >= this.items.length) this.current = 0
    }

    prev() {
        this.current --
        if (this.current < 0) this.current = this.items.length - 1
    }

    left() {
    }

    right() {
    }

    select() {
        log('selected #' + this.current + ' [' + this.currentItem() + ']')
        if (this.onSelect) {
            this.onSelect( this.currentItem() )
        }
    }

    activate(action) {
        switch(action) {
            case 1: this.prev(); break;
            case 3: this.next(); break;
            case 5: this.select(); break;
        }
    }

    draw() {
        if (!this.items) return
        const n = this.items.length
        const cx = this.x + floor(this.w/2)
        const cy = this.y + floor(this.h/2)

        alignCenter()
        baseTop()
        font(env.style.font)

        const x = cx
        const rx = this.x
        const rw = this.w
        const h = n * this.step
        let y = cy - floor(h/2)

        fill(this.background)
        rect(rx-4, y-6, rw+8, h+8)

        for (let i = 0; i < n; i++) {
            const item = this.items[i]

            // backline
            if (i === this.current) fill(this.bacolor)
            else fill(this.bcolor)
            rect(rx, y-1, rw, this.step-2)

            if (i === this.current) fill(this.acolor)
            else fill(this.color)
            text(item, x, y)
            y += this.step
        }
    }

    currentItem() {
        return this.items[this.current]
    }

}
