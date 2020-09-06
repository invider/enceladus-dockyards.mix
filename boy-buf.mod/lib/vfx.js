
function hintAt(text, x, y) {
    lab.screen.battle.spawn(dna.hud.fadeText, {
        Z: 1001,
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
