function grid(src) {
    console.dir(src)

    const layout = []

    let y = 0
    src.split('\n').forEach(l => {
        l = l.trim()
        if (l.length === 0 || l.startsWith('#')) return

        const row = []
        for (let x = 0; x < l.length; x++) {
            const c = l.charAt(x).toLowerCase()
            if (c === 'x') row[x] = 1 // external shell
            else if (c === '*') row[x] = 2 // internal hull
            else row[x] = 0
        }
        layout[y++] = row
    })

    return layout
}
