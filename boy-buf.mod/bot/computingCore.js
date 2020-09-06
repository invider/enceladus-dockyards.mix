function autoSelect() {
    const actions = this.actionsAvailable()
    actions.push('skip')
    return _$.lib.math.rnde(actions)
}

function autoPilot(target) {
    const action = this.autoSelect()
    log('autopilot selected: ' + action)

    if (action === 'skip') {
        // do nothing
    } else {
        this.takeAction(action, target)
    }
}
