let pokemonList = [ 
    {
        name: 'Bulbasaur', 
        height: 0.7,
        type: ['grass', 'poison']
    }, 
    {
        name: 'Charmander', 
        height: 0.6, 
        type: ['fire']
    },
    {
        name: 'Charizard', 
        height: 1.7, 
        type: ['fire', 'flying']
    },
    {
        name: 'Squirtle', 
        height: 0.5, 
        type: ['water']
    }
];

pokemonList.forEach(function(pokemon) {
    document.write(`${pokemon.name} (height: ${pokemon.height})`);

    if(pokemon.height > 1) {
        document.write(' - Wow, that\'s big!');
    }

    document.write('<br>');
}); 