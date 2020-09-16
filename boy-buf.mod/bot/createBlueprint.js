let map
let pods

let sets = []

function compilePods() {
    pods = []
    map = {}

    dna.zpods._ls.forEach(podCons => {
        const pod = new podCons()
        pods.push(pod)
        map[pod.name] = pod
    })
}

function mul(set, pod, N) {
    for (let i = 0; i < N; i++) {
        set.push(pod)
    }
}

function del(set, pod) {
    const i = set.indexOf(pod) // find the first instance
    if (i >= 0) {
        set.splice(i, 1)
        return pod
    }
}

function take(set) {
    if (!set || set.length === 0) return
    const pod = lib.math.rnde(set)
    del(set, pod)
    return pod
}

function compileSets() {
    compilePods()

    const set1 = []
    pods.forEach(p => set1.push(p))
    mul(set1, map['laser'], 2)
    mul(set1, map['missile'], 2)
    mul(set1, map['armor'], 4)
    sets.push(set1)
}

function podFromSet() {
    const set = sets[0]
    if (!set) return
    if (set.length === 0) {
        sets.splice(0, 1)
        return podFromSet()
    }
    return take(set)
}

function nextPod() {
    const pod = podFromSet()

    if (pod) return pod
    else return lib.math.rnde(pods)
}

function placeNewPod(player, control, blueprint) {
    const loc = blueprint.randomFreeCell()
    if (!loc) return // no free space

    const pod = nextPod()
    if (!pod) return

    control.installPod(pod, loc.x, loc.y)
    log('+ ' + pod.name + ' $' + pod.cost)

    if (loc.x < 2) {
        loc.x = 4 - loc.x
        control.installPod(pod, loc.x, loc.y)
        log('+ ' + pod.name + ' $' + pod.cost)
    } else if (loc.x > 2) {
        loc.x = 4 - loc.x
        control.installPod(pod, loc.x, loc.y)
        log('+ ' + pod.name + ' $' + pod.cost)
    }
    return pod
}

function createBlueprint(player, control, emptyBlueprints) {
    compileSets()

    const blueprint = lib.math.rnde(emptyBlueprints)
    player.blueprint = blueprint
    control.designForBot(player)

    let loc = blueprint.freeAxisCell()
    if (loc) control.installPod(map['reactor'], loc.x, loc.y)

    loc = blueprint.freeAxisCell()
    if (loc) control.installPod(map['shield'], loc.x, loc.y)

    let i = 0
    const N = blueprint.freeSpace()
    while (blueprint.freeSpace() > 0 && player.balance > 0 && i < N) {
        placeNewPod(player, control, blueprint)
        i++
    }

    control.finalizeBlueprint(blueprint)
    return blueprint
}
