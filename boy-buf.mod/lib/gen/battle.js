function battle() {
    lab.screen.touch('battle', dna.trait.hidable)
    augment(lab.screen.battle, {
        // TODO refactor on hide and bind trait
        show: function() {
            this.hidden = false
            lab.control.player.bindAll(lab.screen.battle.left)
        }
    })

    // create ship grids
    const left = lab.screen.battle.spawn(dna.ShipGrid, {
        Z: 11,
        name: 'left',
        x: 6,
        y: 12,
    })

    const right = lab.screen.battle.spawn(dna.ShipGrid, {
        Z: 11,
        name: 'right',
        x: 86,
        y: 12,
        layout: dna.spec.layout.whale,
    })
}
