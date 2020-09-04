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

    const leftMenu = battle.spawn(dna.hud.PopupMenu, {
        Z: 21,
        name: 'leftMenu',
        x: 10,
        y: 10,
        w: 60,
        h: 100,
    })

    const right = battle.spawn(dna.hud.ShipGrid, {
        Z: 11,
        name: 'right',
        x: 86,
        y: 12,
        layout: dna.spec.layout.whale,
    })

    const rightMenu = battle.spawn(dna.hud.PopupMenu, {
        Z: 21,
        name: 'rightMenu',
        x: 90,
        y: 10,
        w: 60,
        h: 100,
    })

    battle.spawn(dna.control.BattleControl, {
        name: 'control',
        left: left,
        right: right,
        leftMenu: leftMenu,
        rightMenu: rightMenu,
    })
}
