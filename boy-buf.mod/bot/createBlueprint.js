let pods
let map

function compilePods() {
    pods = []
    map = {}

    dna.zpods._ls.forEach(podCons => {
        const pod = new podCons()
        pods.push(pod)
        map[pod.name] = pod
    })
}

function placeNewPod(player, control, blueprint) {
    const loc = blueprint.randomFreeCell()
    if (!loc) return

    const pod = lib.math.rnde(pods)
    control.installPod(pod, loc.x, loc.y)

    if (loc.x < 2) {
        loc.x = 4 - loc.x
        control.installPod(pod, loc.x, loc.y)
    } else if (loc.x > 2) {
        loc.x = 4 - loc.x
        control.installPod(pod, loc.x, loc.y)
    }
    return pod
}

function createBlueprint(player, control, emptyBlueprints) {
    compilePods()

    const blueprint = lib.math.rnde(emptyBlueprints)
    player.blueprint = blueprint
    control.designForBot(player)

    let i = 0
    const N = blueprint.freeSpace()
    while (blueprint.freeSpace() > 0 && player.balance > 0 && i < N) {
        placeNewPod(player, control, blueprint)
        i++
    }

    control.finalizeBlueprint(blueprint)
    log('$$$ money left: ' + player.balance)
    return blueprint
}
