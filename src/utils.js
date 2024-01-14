const fetchPokemons = async () => {
  /* -------------------- fetch the data of X pokemons (10 by default) -------------------- */
  const limit = 10;
  /* ----------------------------------- url ---------------------------------- */
  const url = encodeURI(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

  /* ----------------------------- fetch operation ---------------------------- */
  const response = await fetch(url);
  const pokemonsData = await response.json();

  /* ----------------------------- data processing ---------------------------- */
  const results = await pokemonsData.results.map((pokemon) => {
    const id = pokemon.url.match(/\/(\d+)\/$/)[1];
    return {
      name: pokemon.name,
      id: id,
    };
  });
  /* -------------------- add image url depending on the ID ------------------- */
  const updatedResults = results.map((res) => ({
    ...res,
    imageUrl: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${res.id}.svg`,
  }));
  return updatedResults;
};

/* ----------------------- shuffle array function algo ---------------------- */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return [...array];
};

export { fetchPokemons, shuffleArray };
