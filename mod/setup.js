function setup() {
    lab.background = mod['boy-buf'].env.style.color.border

    lab.spawn(_$.dna.hud.Transition, {
        fadein: 0,
        keep: env.tune.fadeKeep,
        fadeout: env.tune.fadeOut,
    })
}
