const themes = []

const items = [
    { section: true, title: 'theme' },
    themes,
    'remove saved',
    'back',
]

function onSelect(item) {
    if (item === 'back') {
        this.__.control.mainMenu()
    } else if (item === 'remove saved') {
        lib.util.clearCache()
        sfx.play('powerDown', env.mixer.level.powerdown)

        const cache = lib.util.loadCache()
        if (cache.blueprints) {
            const N = Object.keys(cache.blueprints).length
            for (let i = 0; i < N; i++) {
                setTimeout(() => {
                    sfx.play('noisy', env.mixer.level.clean)
                    lib.vfx.poof(this.__, RND(ctx.width), RND(ctx.height))
                }, RND(1000))
            }
        }
    }
}

function onSwitch(item) {
    const themeName = item[item.current]
    lib.remap.tiles.setTheme(themeName)
}

function onBack(item) {
    this.__.control.mainMenu()
}

function setup() {
    const W = 90
    const B = floor((ctx.width-W)/2)
    const menu = this.__.spawn(dna.hud.Menu, {
        Z: 1,
        name: 'menu',
        x: B,
        y: 30,
        w: W,
        h: ctx.height-60,
        background: false,
    })
    this.menu = menu

    themes.push(env.style.theme)
    Object.keys(env.style.palette).forEach(name => {
        if (name !== env.style.theme) {
            themes.push(name)
        }
    })

    augment(this.__, {
        show: function() {
            this.hidden = false
            this.control.state = 0
            this.menu.selectFrom({
                items,
                onSelect,
                onSwitch,
                onBack,
            })
        },
        hide: function() {
            this.hidden = true
            lab.control.player.unbindAll(menu)
        },
    })
}

function mainMenu() {
    if (this.state) return
    this.state = 1

    this.__.hide()
    lab.control.player.unbindAll(this.menu)

    trap('menu', true)
}
