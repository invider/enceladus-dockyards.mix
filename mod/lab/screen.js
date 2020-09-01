module.exports = {

    draw: function() {
        const screen = mod['screen-buf']

        const w = env.tune.width*4
        const h = env.tune.height*4
        const hb = (ctx.width - w)/2
        const vb = (ctx.height - h)/2
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(screen.ctx.canvas, hb, vb, w, h)
    }
}
