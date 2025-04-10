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
        let modalContainer = document.querySelector('#modal-container');
        
        modalContainer.innerHTML = '';
        
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonImage = document.createElement('img')
        pokemonImage.src = pokemon.imageUrl;

        let titleElement = document.createElement('h1');
        titleElement.classList.add('pokemodal-title')
        titleElement.innerText = pokemon.name;

        let contentHeight = document.createElement('p');
        let pokeHeight = Math.round(pokemon.height)/10;
        contentHeight.innerText = 'Height: ' + pokeHeight + 'm'; 
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(pokemonImage);
        modal.appendChild(contentHeight);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if(target === modalContainer) {
                hideModal();
            };
        });

        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            };
        });
    };

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    };

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