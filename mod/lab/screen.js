module.exports = {
    Z: 1,

    draw: function() {
        const screen = mod['boy-buf']

        const w = env.tune.width * env.tune.scale
        const h = env.tune.height * env.tune.scale
        const hb = (ctx.width - w)/2
        const vb = (ctx.height - h)/2
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(screen.ctx.canvas, hb, vb, w, h)
    }
}
