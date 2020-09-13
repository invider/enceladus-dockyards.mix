function populate() {
    const map = {}
    const stat = {}
    const pods = []

    dna.zpods._ls.forEach(podCons => {
        const pod = new podCons()
        pods.push(pod)
        map[pod.name] = pod

        const st = []
        st.push(`cost: $${pod.cost}`)
        st.push(`hits: ${pod.hits}`)
        if (pod.attack) st.push(`attack: ${pod.attack}`)
        if (pod.shots) st.push(`shots: ${pod.shots}`)
        if (pod.charge) st.push(`charge: ${pod.charge}`)
        if (pod.output) st.push(`output: ${pod.output}`)
        stat[pod.name] = st
    })

    this.map = map
    this.pods = pods
    this.stat = stat
}

function podCost(name) {
    const pod = this.map[name]
    if (pod && pod.cost) return pod.cost
    return 0
}

function podHits(name) {
    const pod = this.map[name]
    if (pod && pod.hits) return pod.hits
    return 0
}

function podStat(name) {
    return this.stat[name]
}


function getTilex(name, pod) {
    let tilex = -1
    switch(name) {
        case 'free':    tilex = 0; break;
        case 'shell':   tilex = 0; break;
        case 'armor':   tilex = 4; break;
        case 'debris':  tilex = 1; break;
        case 'laser':
            if (!pod || pod.isReady()) tilex = 13
            else tilex = 12
            break

        case 'missile':
            tilex = 8; break;

        case 'jammer':
            if (!pod || pod.isReady()) tilex = 27
            else tilex = 26
            break

        case 'driver':
            if (!pod || pod.isReady()) tilex = 21
            else tilex = 20
            break

        case 'reactor': tilex = 16; break;
        case 'gen':     tilex = 24; break;
        case 'kinetic': tilex = 6; break;
        case 'repair':  tilex = 10; break;
        default:
            tilex = 9;
    }
    return tilex
}

