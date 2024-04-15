import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "components/Spinner";
import { capitalize } from "utils";
import { PokemonType } from "types";
import "styling/App.scss";

export default function Pokemon() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pokemon, setPokemon] = useState<any | null>(null);
  const { pokemonName } = useParams();

  useEffect(() => {
    const fetchSinglePokemon = async () => {
      try {
        const request = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
        );
        if (request.ok) {
          const response = await request.json();
          setPokemon(response);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchSinglePokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pokemon === null) {
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    );
  } else {
    const name = capitalize(pokemon.name);
    const typeLabel = pokemon.types > 1 ? "Types:" : "Type:";
    const types = pokemon.types
      .map((elm: PokemonType) => elm.type.name)
      .join(", ");
    return (
      <div>
        <header>
          <h1>{capitalize(pokemon.name)}</h1>
        </header>
        <div className="return">
          <Link to="/">&#8592; Return to List</Link>
        </div>
        <div className="details">
          <img src={pokemon.sprites.front_default} />
          <h4>#{pokemon.id}</h4>
          <h4>Name: {name}</h4>
          <h4>
            {typeLabel} {types}
          </h4>
        </div>
      </div>
    );
  }
}
