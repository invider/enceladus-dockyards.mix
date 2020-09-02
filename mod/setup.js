function setup() {
    lab.background = mod['boy-buf'].env.style.color.border

    lab.spawn(_$.dna.hud.Transition, {
        fadein: 0,
        keep: .5,
        fadeout: 2,
    })
}
