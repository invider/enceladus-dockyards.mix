function battle() {
    const battle = lab.screen.touch('battle', dna.trait.hidable)
    _$.battle = battle

    battle.spawn(dna.hud.Separator, {
        x: floor(ctx.width/2)
    })

    // create ship grids
    const left = battle.spawn(dna.hud.ShipGrid, {
        Z: 11,
        name: 'left',
        x: 3,
        y: 12,
    })

    const PY = 114
    const leftPanel = battle.spawn(dna.hud.ShipPanel, {
        Z: 12,
        name: 'leftPanel',
        x: 1,
        y: PY,
    })

    const leftMenu = battle.spawn(dna.hud.PopupMenu, {
        Z: 21,
        name: 'leftMenu',
        x: 10,
        y: 10,
        w: 60,
        h: 100,
        alt: function() {
            this.hidden = !this.hidden
        }
    })

    const right = battle.spawn(dna.hud.ShipGrid, {
        Z: 11,
        name: 'right',
        x: 86,
        y: 12,
        layout: dna.spec.layout.whale,
    })

    const rightPanel = battle.spawn(dna.hud.ShipPanel, {
        Z: 12,
        name: 'rightPanel',
        x: 82,
        y: PY,
    })

    const rightMenu = battle.spawn(dna.hud.PopupMenu, {
        Z: 21,
        name: 'rightMenu',
        x: 90,
        y: 10,
        w: 60,
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
