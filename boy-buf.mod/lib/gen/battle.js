function battle() {
    const battle = lab.screen.touch('battle', dna.trait.hidable)

    // create ship grids
    const left = battle.spawn(dna.hud.ShipGrid, {
        Z: 11,
        name: 'left',
        x: 6,
        y: 12,
    })

    const right = battle.spawn(dna.hud.ShipGrid, {
        Z: 11,
        name: 'right',
        x: 86,
        y: 12,
        layout: dna.spec.layout.whale,
    })

    battle.spawn(dna.control.BattleControl, {
        name: 'control',
        left: left,
        right: right,
    })
}
