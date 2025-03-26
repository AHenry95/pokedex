let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if(typeof pokemon !== 'object') {
            return document.write('<p> add function is still broken </p>');
        }
        
        if(!['name', 'detailsUrl'].every(key => Object.keys(pokemon).includes(key))) {
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
            showDetails(pokemon); 
       });
        
    };
    
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            console.log(pokemon.name);
        });
    };

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json){
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name, 
                    detailsUrl: item.url
                };
                add(pokemon);
                hideLoadingMessage();
            });
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    function showLoadingMessage() {
        let loading = document.querySelector('.loading-message');
        loading.classList.remove('hidden');
    }
    
    function hideLoadingMessage() {
        let loading = document.querySelector('.loading-message');
        loading.classList.add('hidden'); 
    }

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }  
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    }); 
});