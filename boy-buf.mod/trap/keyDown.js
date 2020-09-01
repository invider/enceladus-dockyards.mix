
function handleControl(e) {
    switch(e.code) {
        case 'Minus':
            // TODO zoom out
            break
        case 'Plus':
            // TODO zoom in
            break

        case 'Escape':
            // TODO reset the game?
            break
        case 'F8':
            lib.img.screenshot('enceladus-dockyards')
            break
    }
}

function keyDown(e) {

    const action = env.bind.keyMap[e.code]

    if (action) {
        lab.control.player.act(action.id, 0)
    } else {
        handleControl(e)
    }
}
