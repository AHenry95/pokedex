let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if(typeof pokemon !== 'object') {
            return;
        }
        
        if(!['name', 'detailsUrl'].every(key => Object.keys(pokemon).includes(key))) {
            return;
        }

        pokemonList.push(pokemon);
    }    

    function search(query){
        return pokemonList.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(query.toLowerCase());
        });
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let button = document.createElement('button');
        button.innerText = pokemon.name; 
        button.classList.add('btn', 'btn-primary', 'pokemon-list_name');
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#pokeModal');
        pokemonButtonListener(button, pokemon);

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    };

    function pokemonButtonListener(button, pokemon){
       button.addEventListener('click', function() {
            showDetails(pokemon); 
       });
    };
    
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
           showModal(pokemon);
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
            });
            hideLoadingMessage();
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

    function showModal(pokemon) {

        let pokemonImage = document.createElement('img')
        pokemonImage.src = pokemon.imageUrl;

        let titleElement = document.querySelector('#pokeModal-title');
        titleElement.classList.add('pokemon-list_name') //This is to capitalize the name 
        titleElement.innerText = pokemon.name;

        let modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';

        let contentHeight = document.createElement('p');
        let pokeHeight = Math.round(pokemon.height)/10;
        contentHeight.innerText = 'Height: ' + pokeHeight + 'm'; 
        
        modalBody.appendChild(pokemonImage);
        modalBody.appendChild(contentHeight);
    };

    return {
        getAll: getAll,
        add: add,
        search: search,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };  
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    }); 
});