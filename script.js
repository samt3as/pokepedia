const pokemonInput = document.getElementById("pokemon-input");
const searchButton = document.getElementById("search-button");
const detailsContainer = document.getElementById("details-container");
const abilitiesContainer = document.getElementById("abilities");
const nameContainer = document.getElementById("name");
const typesContainer = document.getElementById("types");
const flavourText = document.getElementById("flavour-text");
const spriteImage = document.getElementById("sprite-image");
const shinySprite = document.getElementById("shiny-sprite");
const pokeballImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png'
// const strengthContainer = document.
let pokemonAbilities;
let pokemonTypes;
let pokemonName;
if (searchButton) {
    searchButton.addEventListener("click", (event) => {
        event.preventDefault();
        lookUpPokemon()
    })
}
// Check if the current page is the second page
if (window.location.pathname.includes('./pokepedia2.html')) {
    //  Fetch pokemon data
    fetchPokemonData();
}

// This function takes you to the second page (pokepedia2) and it attachs what pokemon you search for.
function lookUpPokemon() {
    console.log("hello", pokemonInput.value)
    window.location.href = `./pokepedia2.html?search=${pokemonInput.value.toLowerCase()
        }`;
}


async function fetchPokemonData() {
    // grabs value of query param named search so we know what pokemon we are looking for (?search=____)
    const searchValue = new URLSearchParams(window.location.search).get('search');

    // store pokemon data that was recieved
    const data = await getPokemonData(searchValue)

    let englishFlavourData;

    const pokemonData = data?.data || null;
    const pokemonDescription = data?.descirption || null;

    console.log('DATA', data)

    englishFlavourData = [...(pokemonDescription?.flavor_text_entries || [])].filter(entry => entry.language.name === 'en');

    pokemonName = pokemonData?.species.name || 'Not found';
    console.log('PokemonName?', pokemonName)
    pokemonAbilities = getAbilities(pokemonData?.abilities || [{ ability: { name: 'N/A' } }]);
    pokemonTypes = getPokemonTypes(pokemonData?.types || [{ type: { name: 'N/A' } }]);
    spriteImage.src = pokemonData?.sprites.front_default || pokeballImageUrl;
    shinySprite.src = pokemonData?.sprites.front_shiny || pokeballImageUrl;

    displayAbilities(pokemonAbilities || []);
    displayName(pokemonName)
    displayTypes(pokemonTypes)
    displayFlavorText(englishFlavourData)

    console.log('I did this');
    changeType(pokemonTypes[0]);
    console.log('I did this, x2');
    // displayStrengths(strengths)
}

function displayStrengths(strongAgainst) {
    if (strengthContainer) {
    }

}

function displayAbilities(abilities) {
    if (abilitiesContainer) {
        const abilityList = `<ul class="abilities-list"> 
            ${abilities.map(item => '<li>' + item + '</li>').join('')}
        </ul>`
        abilitiesContainer.innerHTML = abilityList;
    }
}

function displayName(name) {
    if (nameContainer) {
        nameContainer.innerHTML = name;
    }
}


function displayTypes(types) {
    // 'types' is an array of strings
    if (typesContainer) {
        const typeList = `<ul class="types-list"> 
            ${types.map(item => '<li>' + item + '</li>').join('')}
        </ul>`

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
function getAbilities(abilities = []) {
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
    const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const pokemonDescriptionUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;

    try {
        const responseData = await fetch(pokemonDataUrl);  // Fetch data from the PokéAPI
        const responseDescription = await fetch(pokemonDescriptionUrl);  // Fetch data from the PokéAPI
        if (!responseData.ok || !responseDescription.ok) {
            throw new Error(`Pokemon not found: ${pokemon}`);
        }

        const pokeData = await responseData.json();  // Parse the response as JSON
        const pokeDescriptionData = await responseDescription.json();  // Parse the response as JSON

        const data = {
            data: pokeData,
            descirption: pokeDescriptionData
        }
        //   location.href="/pokepedia2.html"
        return data;  // Return the full data object if needed elsewhere
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
}



// Function to change the background color based on the Pokémon type
function changeType(type) {
    // Remove any existing type classes
    const indexSecondary = document.getElementById('indexSecondary');
    indexSecondary.className = '';  // Remove all existing classes

    // Add the new class corresponding to the Pokémon type
    indexSecondary.classList.add(type);
}

function displayFlavorText(flavorTextEntries) {
    // Create accordion items dynamically based on the data
    const accordionContainer = document.getElementById('pokemonAccordion');

    flavorTextEntries.forEach(entry => {
        const { flavor_text, version } = entry;

        // Create accordion item
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        // Create header for the accordion item
        const accordionHeader = document.createElement('button');
        accordionHeader.classList.add('accordion-header');

        // Create an arrow element
        const arrow = document.createElement('span');
        arrow.classList.add('arrow');
        arrow.textContent = '▼'; // Down arrow by default

        // Create the version name element
        const versionName = document.createElement('span');
        versionName.textContent = capitalizeFirstLetter(version.name);

        // Create content for the accordion item
        const accordionContent = document.createElement('div');
        accordionContent.classList.add('accordion-content');
        accordionContent.textContent = flavor_text;

        // Append the arrow and version name to the accordion header
        accordionHeader.appendChild(versionName);
        accordionHeader.appendChild(arrow);

        // Append header and content to the item
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionContent);

        // Add click event to toggle the accordion item
        accordionHeader.addEventListener('click', () => {
            accordionItem.classList.toggle('active');
            // Toggle the arrow direction
            if (accordionItem.classList.contains('active')) {
                arrow.textContent = '▲'; // Up arrow when active
            } else {
                arrow.textContent = '▼'; // Down arrow when inactive
            }
        });

        // Append the item to the accordion container
        accordionContainer.appendChild(accordionItem);
    });
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}








//TODO


