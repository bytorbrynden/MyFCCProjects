const searchInputElem = document.getElementById("search-input");
const searchBtnElem   = document.getElementById("search-button");
const statsDivElem    = document.getElementById("pokemon-stats");
const statElements    = {
    id:             document.getElementById("pokemon-id"),
    name:           document.getElementById("pokemon-name"),
    sprite:         document.getElementById("sprite"),
    weight:         document.getElementById("weight"),
    height:         document.getElementById("height"),
    types:          document.getElementById("types"),
    hp:             document.getElementById("hp"),
    attack:         document.getElementById("attack"),
    defense:        document.getElementById("defense"),
    specialAttack:  document.getElementById("special-attack"),
    specialDefense: document.getElementById("special-defense"),
    speed:          document.getElementById("speed")
};

const POKEAPI_URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

let pokemonInfo = { };

const updateUI = (data) => {
    statElements.types.innerHTML = "";

    statElements.sprite.setAttribute("src", data.sprite);

    statElements.name.textContent = data.name;
    statElements.id.textContent = data.id;
    statElements.weight.textContent = data.weight;
    statElements.height.textContent = data.height;
    statElements.hp.textContent = data.hp;
    statElements.attack.textContent = data.attack;
    statElements.defense.textContent = data.defense;
    statElements.specialAttack.textContent = data["special-attack"];
    statElements.specialDefense.textContent = data["special-defense"];
    statElements.speed.textContent = data.speed;

    data.types.forEach(t => {
        let typeElem = document.createElement("span");
        typeElem.classList.add("type");
        typeElem.textContent = t;

        statElements.types.appendChild(typeElem);
    });
};

const searchForPokemon = () => {
    const pokemonNameOrId = searchInputElem.value.toLowerCase();

    if (!pokemonNameOrId) {
        alert("Please enter a name!");

        return;
    }

    console.log(POKEAPI_URL + pokemonNameOrId);

    fetch(POKEAPI_URL + pokemonNameOrId)
        .then(res => res.json())
        .then(data => {
            pokemonInfo.name = data.name;
            pokemonInfo.id = data.id;
            pokemonInfo.weight = data.weight;
            pokemonInfo.height = data.height;
            pokemonInfo.sprite = data.sprites.front_default;
            pokemonInfo.types = [];

            data.stats.map(statObj => {
                pokemonInfo[statObj.stat.name] = statObj.base_stat;
            });

            data.types.map(typeObj => {
                pokemonInfo.types.push(typeObj.type.name);
            });
            
            updateUI(pokemonInfo);
        }).catch(err => {
            alert("Pokémon not found");
        });
};

searchBtnElem.addEventListener("click", searchForPokemon);
searchInputElem.addEventListener("keydown", e => e.key === "Enter"? searchForPokemon() : null);