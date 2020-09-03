function newGame() {

    const playerA = lab.spawn(dna.Player, {
        name: 'playerA',
    })
    const playerB = lab.spawn(dna.Player, {
        name: 'playerB',
    })

    trap('layout', playerA)
}
