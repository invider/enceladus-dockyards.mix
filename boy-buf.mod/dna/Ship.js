class Ship {

    constructor(blueprint) {
        this.blueprint = blueprint
        this.w = blueprint.w
        this.h = blueprint.h

        this.grid = []
        this.pods = []

        const podDNA = dna.zpods._dir
        for (let y = 0; y < blueprint.h; y++) {
            for (let x = 0; x < blueprint.w; x++) {
                const podName = blueprint.podAt(x, y)
                const podCons = podDNA[podName]
                if (podCons) {
                    const pod = new podCons()
                    this.mountPod(pod, x, y)
                }
            }
        }
    }

    cellType(x, y) {
        return this.blueprint.cellType(x, y)
    }

    podAt(x, y) {
        const pod = this.grid[y + this.w + x]
        if (pod) return pod.name
        return this.blueprint.podAt(x, y)
    }

    mountPod(pod, x, y) {
        pod.x = x
        pod.y = y
        pod.ship = this
        this.pods.push(pod)
        this.grid[y * this.w + x] = pod
    }
}
