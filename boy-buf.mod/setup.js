module.exports = function() {
    _$.boy = _ // mix shortcut

    // setup gameboy screen resolution
    ctx.width = _._$.env.tune.width
    ctx.height = _._$.env.tune.height
    ctx.canvas.width = _._$.env.tune.width
    ctx.canvas.height = _._$.env.tune.height

    // create ship grids
    const left = lab.spawn(dna.ShipGrid, {
        name: 'left',
        x: 6,
        y: 12,
    })
    lab.control.player.bindAll(left)

    const right = lab.spawn(dna.ShipGrid, {
        name: 'right',
        x: 86,
        y: 12,
        layout: dna.spec.layout.whale,
    })
    //right.layout = dna.spec.layout.whale
}
