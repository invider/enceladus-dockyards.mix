
function hintAt(text, x, y) {
    lab.screen.battle.vfx.spawn(dna.hud.fadeText, {
        text: text,
        font: env.style.font,
        fillStyle: env.style.color.c3,
        align: 'left',
        ttl: 4,
        tti: 0.3,
        ttf: 1,

        x: x,
        y: y,
        dx: RND(12) - 6,
        dy: -4 -RND(10),
    })
}

function debris(x, y) {
    lab.screen.battle.vfx.spawn(dna.Emitter, {
        x: x,
        y: y,
        color: env.style.color.c1,
        lifespan: 0.05,
        force: 1000,
        radius: 0,
        size: 1,
        speed: 8, vspeed: 10,
        angle: 0, spread: 2*Math.PI,
        minLifespan: 0.2, vLifespan: 0.6,
        drawParticle: function() {
            fill(this.color)
            rect(floor(this.x), floor(this.y), this.r, this.r)
        }
    })
}
