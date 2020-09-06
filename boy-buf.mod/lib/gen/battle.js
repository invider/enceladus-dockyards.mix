function battle() {
    const battle = lab.screen.touch('battle', dna.trait.hidable)
    _$.battle = battle

    battle.spawn(dna.hud.Separator, {
        x: floor(ctx.width/2)
    })

    // create ship grids
    const GY = 18
    const left = battle.spawn(dna.hud.ShipGrid, {
        Z: 11,
        name: 'left',
        x: 6,
        y: GY,
    })

    const PY = 114
    const leftPanel = battle.spawn(dna.hud.ShipPanel, {
        Z: 12,
        name: 'leftPanel',
        x: 1,
        y: PY,
        w: 78,
        h: ctx.height - PY,
    })

    const MY = 15
    const leftMenu = battle.spawn(dna.hud.PopupMenu, {
        Z: 21,
        name: 'leftMenu',
        x: 0,
        y: MY,
        w: 79,
        h: 100,
        alt: function() {
            this.hidden = !this.hidden
        }
    })

    const right = battle.spawn(dna.hud.ShipGrid, {
        Z: 11,
        name: 'right',
        x: 83,
        y: GY,
        layout: dna.spec.layout.whale,
    })

    const rightPanel = battle.spawn(dna.hud.ShipPanel, {
        Z: 12,
        name: 'rightPanel',
        x: 82,
        y: PY,
        w: 78,
        h: ctx.height - PY,
    })

    const rightMenu = battle.spawn(dna.hud.PopupMenu, {
        Z: 21,
        name: 'rightMenu',
        x: 81,
        y: MY,
        w: 79,
        h: 100,
        alt: function() {
            this.hidden = !this.hidden
        }
    })

    battle.spawn(dna.control.BattleControl, {
        name: 'control',
        left: left,
        right: right,
        leftPanel: leftPanel,
        rightPanel: rightPanel,
        leftMenu: leftMenu,
        rightMenu: rightMenu,
    })
}
