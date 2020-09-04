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
        stat[pod.name] = st
    })

    this.map = map
    this.pods = pods
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
    const stat = this.stat[name]
    return stat || []
}

