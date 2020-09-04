function populate() {
    const map = {}
    const pods = []

    dna.zpods._ls.forEach(podCons => {
        const pod = new podCons()
        pods.push(pod)
        map[pod.name] = pod
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

