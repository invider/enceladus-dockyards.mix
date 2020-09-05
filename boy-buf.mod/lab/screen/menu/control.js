const items = [
    'new game',
    { section: true, title: 'player A'},
    ['human', 'AI'],
    ['$1000', '$1200', '$1600', '$2000', '$400', '$600', '$800'],
    { section: true, title: 'player B'},
    ['AI', 'human'],
    ['$1000', '$1200', '$1600', '$2000', '$400', '$600', '$800'],
]


function onSelect(item) {
    if (item === items[0]) {
        this.__.control.newGame()
    }
}

function onSwitch(item) {
    log('#' + this.current + ' switch to ' + item[item.current])
}

function setup() {
    const W = 70
    const B = floor((ctx.width-W)/2)
    const menu = this.__.spawn(dna.hud.PopupMenu, {
        Z: 1,
        name: 'menu',
        x: B,
        y: 30,
        w: W,
        h: ctx.height-30,
        background: false,
    })
    this.menu = menu

    augment(this.__, {
        show: function() {
            this.hidden = false
            this.control.state = 0
            this.menu.selectFrom(items, onSelect, onSwitch)
            //lab.control.player.bindAll(menu)
        },
        hide: function() {
            this.hidden = true
            lab.control.player.unbindAll(menu)

        },
    })
}

function newGame() {
    if (this.state) return
    this.state = 1

    lab.control.player.unbindAll(this.menu)

    const activeScreen = this.__
    lab.vfx.transit({
        fadein: 1,
        hold: .5,
        onFadeOut: function() {
            activeScreen.hide()
            trap('newGame')
        },
        fadeout: 2,
    })
}
