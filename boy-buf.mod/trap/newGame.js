function newGame() {

    lab.spawn(dna.Player, {
        name: 'playerA',
    })
    lab.spawn(dna.Player, {
        name: 'playerB',
    })

    trap('layout')
}
