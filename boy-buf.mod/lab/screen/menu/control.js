const items = [
    'new game',
    { section: true, title: 'player A'},
    ['human', 'bot'],
    ['$1000', '$1200', '$1600', '$2000', '$400', '$600', '$800'],
    { section: true, title: 'player B'},
    ['bot', 'human'],
    ['$1000', '$1200', '$1600', '$2000', '$400', '$600', '$800'],
]


function onSelect(item) {
    if (item === items[0]) {
        this.__.control.newGame()
    }
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
            this.menu.selectFrom(items, onSelect)
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

    const gameConfig = {
        playerA: {
            human: this.menu.selectedValue(2) === 'human',
            budget: parseInt(this.menu.selectedValue(3).substring(1)),
        },
        playerB: {
            human: this.menu.selectedValue(5) === 'human',
            budget: parseInt(this.menu.selectedValue(6).substring(1)),
        },
    }

    const activeScreen = this.__
    lab.vfx.transit({
        fadeIn: env.style.fadeIn,
        hold: .5,
        onFadeOut: function() {
            activeScreen.hide()
            trap('newGame', gameConfig)
        },
        fadeOut: env.style.fadeOut,
    })
}
