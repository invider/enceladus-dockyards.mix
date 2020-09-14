function autoSelect() {
    const actions = this.actionsAvailable()
    if (actions.length === 0) return 'skip'
    else return _$.lib.math.rnde(actions)
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
