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

/* Version A - My inital attempt

for (i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + '- Wow, that\'s big!')
    } else { 
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    }
} */

// Version B 


for (i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];

    document.write(`${pokemon.name} (height: ${pokemon.height})`);

    if(pokemon.height > 1) {
        document.write(' - Wow, that\'s big!');
    }

    document.write('<br>');
} 