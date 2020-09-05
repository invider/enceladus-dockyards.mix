const df = {
    x: 0,
    y: 0,
    w: 80,
    h: 40,
    step: 10,
    current: 0,
    border: 2,
}
class PopupMenu {

    constructor(st) {
        this.setupColors()
        augment(this, df)
        augment(this, st)
    }

    setupColors() {
        // need to setup manually,
        // since colors are not available on df{} creation
        this.background = env.style.color.c1
        this.color = {
            main: env.style.color.c3, 
            bcolor: env.style.color.c0, 
            scolor: env.style.color.c2,
            acolor: env.style.color.c0, 
            bacolor: env.style.color.c3, 
        }
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

        this.slideToActiveItem()
        this.show()
    }

    slideToActiveItem() {
        const item = this.items[this.current]
        if (isObj(item) && item.section) {
            this.current ++
            if (this.current >= this.items.length) this.current = 0
            this.slideToActiveItem()
        }
    }

    next() {
        this.current ++
        if (this.current >= this.items.length) this.current = 0

        const item = this.items[this.current]
        if (isObj(item) && item.section) this.next()
    }

    prev() {
        this.current --
        if (this.current < 0) this.current = this.items.length - 1

        const item = this.items[this.current]
        if (isObj(item) && item.section) this.prev()
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

        const b = this.border
        const x = cx
        const rx = this.x
        const rw = this.w
        const h = n * this.step + 2*b
        let y = cy - floor(h/2)

        if (this.background) {
            fill(this.background)
            rect(rx, y-2*b, rw, h)
        }

        for (let i = 0; i < n; i++) {
            let active = true
            let item = this.items[i]
            if (isArray(item)) {
                item = '< ' + item[item.current] + ' >'
            } else if (isObj(item) && item.section) {
                active = false
                item = item.title
            }

            // backline
            if (i === this.current) fill(this.color.bacolor)
            else fill(this.color.bcolor)
            rect(rx+b, y-1, rw-2*b, this.step-2)

            if (!active) fill(this.color.scolor)
            else if (i === this.current) fill(this.color.acolor)
            else fill(this.color.main)
            text(item, x, y)
            y += this.step
        }
    }

    currentItem() {
        return this.items[this.current]
    }

    selectedValue(i) {
        const item = this.items[i]
        if (isString(item)) return item
        else if (isArray(item)) {
            return item[item.current]
        }
    }
}
