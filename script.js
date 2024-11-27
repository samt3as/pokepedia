const pokemonInput = document.getElementById("pokemon-input");
const searchButton = document.getElementById("search-button");
const detailsContainer = document.getElementById("details-container");
const abilitiesContainer = document.getElementById("abilities");
const nameContainer = document.getElementById("name");
const typesContainer = document.getElementById("types");
const flavourText = document.getElementById("flavour-text");
const spriteImage = document.getElementById("sprite-image");
const shinySprite = document.getElementById("shiny-sprite");

let pokemonAbilities;
let pokemonTypes;
let pokemonName;
if (searchButton) {
    searchButton.addEventListener("click",(event) => {
     event.preventDefault();
        lookUpPokemon()
    } )
}
// Check if the current page is the second page
if (window.location.pathname.includes('/pokepedia2.html')) {
    //  Fetch pokemon data
    fetchPokemonData();
}

// This function takes you to the second page (pokepedia2) and it attachs what pokemon you search for.
function lookUpPokemon() {
    console.log("hello",pokemonInput.value )
    window.location.href = `/pokepedia2.html?search=${pokemonInput.value}`;
}


async function fetchPokemonData() {
    // grabs value of query param named search so we know what pokemon we are looking for (?search=____)
    const searchValue = new URLSearchParams(window.location.search).get('search');
    
    // store pokemon data that was recieved
    const pokemonData = await getPokemonData(searchValue)

    console.log(pokemonData)
    
    pokemonName = pokemonData.name; 
    pokemonAbilities = getAbilities(pokemonData.abilities);   
    pokemonTypes = getPokemonTypes(pokemonData.types);
    spriteImage.src = pokemonData.sprites.front_default;
    shinySprite.src = pokemonData.sprites.front_shiny;
    displayAbilities(pokemonAbilities);
    displayName(pokemonName)
    displayTypes(pokemonTypes)

    console.log(pokemonName)
}
    
function displayAbilities(abilities)  
{
    if (abilitiesContainer) {
        const abilityList = `<ul> 
            ${abilities.map(item => '<li>' + item +'</li>')}
        </ul>` 
     abilitiesContainer.innerHTML = abilityList;
    }
} 

function displayName(name)  
{
    if (nameContainer) { 
     nameContainer.innerHTML = name;
    }
} 


function displayTypes(types)  
{
    // 'types' is an array of strings
    console.log('types', types);
    console.log('is typecontainer', typesContainer)
    if (typesContainer) {
        const typeList = `<ul> 
            ${types.map(item => '<li>' + item +'</li>')}
        </ul>` 
    console.log('typelist',typeList)
     typesContainer.innerHTML = typeList
    }
} 


// A function that returns an array of the names of the pokemon types
function getPokemonTypes(types) {
    // Creating a variable that is an empty array;
    const arrayOfNamesOfTypes = [];

    /* 
        Types is an aray of types, loop through everything in that array and 
        then do something with each entry in the array. In this this case we 
        are pusing the name value of the current type into the array called arrayOfNamesOfTypes.
    */
    for (let type of types) {
        arrayOfNamesOfTypes.push(type.type.name)
    }

    // returning the arrayOfNamesOfTypes which is an array of names of all the types the pokemon has.
    return arrayOfNamesOfTypes;
}

//A function that returns an array of the names of the abilities
function getAbilities(abilities) {
      // Creating a variable that is an empty array;
    const abilitiesArray = [];
 /* 
        Ability/abilities is an aray of the different abilities, loop through everything in that array and 
        then do something with each entry in the array. In this this case we 
        are pusing the name value of the abilities into the array called abilitiesArray
    */
    for (let ability of abilities) {
        abilitiesArray.push(ability.ability.name);
    }
// returning the abilities which is an array of names of all the types the pokemon has.
    return abilitiesArray;
}

async function getPokemonData(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  
    try {
      const response = await fetch(url);  // Fetch data from the PokéAPI
      if (!response.ok) {
        throw new Error(`Pokemon not found: ${pokemon}`);
      }
  
      const data = await response.json();  // Parse the response as JSON

  
    //   location.href="/pokepedia2.html"
      return data;  // Return the full data object if needed elsewhere
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  async function displayPokemon(pokemonName) {
    try {
        const pokemonData = await getPokemonData(pokemonName);
        const types = pokemonData.types.map(typeInfo => typeInfo.type.name);  // Get an array of types like ['fire', 'flying']
        console.log(types);  // Example output: ['fire', 'flying']

        // Now, use these types to add classes to your HTML or apply styles
        const pokemonElement = document.querySelector("#pokemon");
        types.forEach(type => {
            pokemonElement.classList.add(type);  // Add each type as a class
        });
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}

  


    
  

  //TODO
  

  