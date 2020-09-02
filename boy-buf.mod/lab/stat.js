const Z = 21

function draw() {

    save()

    baseTop()
    alignLeft()
    fill(env.style.color.c3)

    translate(.5, .5)
    font('8px pixel-operator-8')
    text('How many symbols we can fit?', 0, 0)

    font('8px retro')
    text('How many symbols we can fit?', 0, 10)

    font('8px typewriter')
    text('How many symbols we can fit?', 0, 20)

    font(env.style.font)
    text('How many symbols we can fit?', 0, 50)

    restore()
}
