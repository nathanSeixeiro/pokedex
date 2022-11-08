const pokeApi = {};

function pokeApiDetailTopokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.order;
  pokemon.name = pokeDetail.name;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  return pokemon
}

pokeApi.getpokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((res) => res.json())
    .then(pokeApiDetailTopokemon);
};

pokeApi.getpokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getpokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.log(error));
};
