function newGame(st) {
    const playerA = lab.spawn(dna.Player, {
        name: 'playerA',
        title: 'Player A',
        human: st.playerA.human,
        balance: st.playerA.budget,
    })
    const playerB = lab.spawn(dna.Player, {
        name: 'playerB',
        title: 'Player B',
        human: st.playerB.human,
        balance: st.playerB.budget,
    })

    trap('layout', playerA)
}
