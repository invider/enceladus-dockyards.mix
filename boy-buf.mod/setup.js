module.exports = function() {
    // setup gameboy screen resolution
    ctx.width = _._$.env.tune.width
    ctx.height = _._$.env.tune.height
    ctx.canvas.width = _._$.env.tune.width
    ctx.canvas.height = _._$.env.tune.height

    lab.spawn(dna.ShipGrid, {
        x: 6,
        y: 12,
    })
    lab.spawn(dna.ShipGrid, {
        x: 86,
        y: 12,
    })
}
