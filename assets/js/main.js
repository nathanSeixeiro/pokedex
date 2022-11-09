//p 0 ``
const pokemonList = document.querySelector("#pokemonsList");
const loadMore = document.querySelector("#loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getpokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) =>
          `<li class="pokemon ${pokemon.type} ">
        <span class="number">#${pokemon.id} </span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
        <ol class="types">
            ${pokemon.types
              .map((type) => `<li class"type ${type}">${type}</li>`)
              .join("")}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}" />
            </div>
        </li>`
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMore.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, limit);
    loadMore.parentElement.removeChild(loadMore);
  } else {
    loadPokemonItens(offset, limit);
  }
});
