function newGame() {

    const playerA = lab.spawn(dna.Player, {
        name: 'playerA',
        title: 'Player A',
    })
    const playerB = lab.spawn(dna.Player, {
        name: 'playerB',
        title: 'Player B',
    })

    trap('layout', playerA)
}
