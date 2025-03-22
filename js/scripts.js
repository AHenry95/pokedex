let pokemonRepository = (function () {

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

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if(typeof pokemon !== 'object') {
            return document.write('<p> add function is still broken </p>');
        }
        
        if(!['name', 'height', 'type'].every(key => Object.keys(pokemon).includes(key))) {
            return document.write('<p> add function is still broken </p>');
        }

        pokemonList.push(pokemon);
    }    

    function search(query){
        return pokemonList.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(query.toLowerCase());
        });
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name; 
        button.classList.add('pokemon-list_button');
        addEventListener(button, pokemon);

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    };

    function addEventListener(button, pokemon){
       button.addEventListener('click', function() {
            showDetials(pokemon); 
       });
        
    };
    
    function showDetials(pokemon){
        console.log(pokemon.name);
    };

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem
    }  
})();

pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
}); 

