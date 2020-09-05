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
    }

    show() {
        this.hidden = false
        lab.control.player.bindAll(this)
    }

    hide() {
        this.hidden = true
        lab.control.player.unbindAll(this)
    }

    selectFrom(items, onSelect, onSwitch) {
        this.current = 0
        this.items = items
        items.forEach(item => {
            if (isArray(item)) {
                if (!item.current) item.current = 0
            }
        })
        this.onSelect = onSelect
        this.onSwitch = onSwitch
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
        const item = this.currentItem()
        if (isArray(item)) {
            item.current --
            if (item.current < 0) item.current = item.length - 1
            if (this.onSwitch) this.onSwitch(item)
        }
    }

    right() {
        const item = this.currentItem()
        if (isArray(item)) {
            item.current ++
            if (item.current >= item.length) item.current = 0
            if (this.onSwitch) this.onSwitch(item)
        }
    }

    select() {
        if (this.onSelect) {
            this.onSelect( this.currentItem() )
        }
    }

    alt() {}

    activate(action) {
        switch(action) {
            case 1: this.prev(); break;
            case 2: this.left(); break;
            case 3: this.next(); break;
            case 4: this.right(); break;
            case 5: this.select(); break;
            case 6: this.alt(); break;
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
            let item = this.items[i]
            if (isArray(item)) {
                item = '< ' + item[item.current] + ' >'
            }

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
