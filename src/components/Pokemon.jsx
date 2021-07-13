import React from 'react';
import create from 'zustand';

// https://www.npmjs.com/package/simple-zustand-devtools

// import { mountStoreDevtool } from "simple-zustand-devtools";
// if (process.env.NODE_ENV === "development") {
//   mountStoreDevtool("Store", useStore);
// }

// Original code from video by Jack Herrington
// youtube: https://www.youtube.com/watch?v=_qCRuFrdhYw

const POKEMON_URL = `https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/f8d792f5b2cf97eaaf9f0c2119918f333e348823/pokemon.json`;

const useStore = create((set) => ({
  filter: '',
  pokemon: [],
  setFilter: (filter) =>
    set((state) => ({
      ...state,
      filter,
    })),
  setPokemon: (pokemon) =>
    set((state) => ({
      ...state,
      pokemon,
    })),
}));

const FilterInput = () => {
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  return (
    <input
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className='pokemonSearch'
    />
  );
};

const PokemonTable = () => {
  const filter = useStore((state) => state.filter);
  const pokemons = useStore((state) => state.pokemon);

  return (
    <table width='100%'>
      <tbody>
        {pokemons
          .filter(({ name: { english } }) =>
            english.toLowerCase().includes(filter.toLowerCase())
          )
          .map(({ id, name: { english }, type }) => (
            <tr key={id}>
              <td>{english}</td>
              <td>{type.join(', ')}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

// we can easily use Store outside app without useEffect hook
fetch(POKEMON_URL)
  .then((resp) => resp.json())
  .then((pokemon) =>
    useStore.setState((state) => ({
      ...state,
      pokemon,
    }))
  );

function Pokemon() {
  // const setPokemon = useStore((state) => state.setPokemon);
  // const pokemons = useStore((state) => state.pokemon);

  // React.useEffect(() => {
  //   fetch(POKEMON_URL)
  //     .then((res) => res.json())
  //     .then((pokemon) => setPokemon(pokemon));
  // });

  return (
    <div className='pokemonApp'>
      <FilterInput />
      <h2>Pokemon List</h2>
      {/* {JSON.stringify(pokemons)} */}
      <PokemonTable />
    </div>
  );
}

export default Pokemon;
