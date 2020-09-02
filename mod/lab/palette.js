function draw() {
    if (!env.config.debug) return

    const color = $.boy.env.style.color

    const s = 80
    let x = 40
    let y = ry(1) - s/2

    fill(color.c0)
    rect(x, y, s, s)
    x += s

    fill(color.c1)
    rect(x, y, s, s)
    x += s

    fill(color.c2)
    rect(x, y, s, s)
    x += s

    fill(color.c3)
    rect(x, y, s, s)
}
