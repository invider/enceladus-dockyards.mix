function autoSelect() {
    const actions = this.actionsAvailable()
    actions.push('skip')
    return _$.lib.math.rnde(actions)
}

function autoPilot(target) {
    const action = this.autoSelect()
    log(`[${this.name}] autopilot selected: [${action}]`)

    if (action === 'skip') {
        // do nothing
        this.skipped ++
    } else {
        this.launch(action, target)
    }
}
