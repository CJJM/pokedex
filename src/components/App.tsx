import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Spinner from "components/Spinner";
import { capitalize } from "utils";
import { NameURLPair } from "types";
import "styling/App.scss";

function App() {
  const [pokemon, setPokemon] = useState<NameURLPair[] | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const { ref } = useInView({
    onChange: (inView: boolean) => {
      if (inView) {
        setPage(page + 1);
      }
    },
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      const limit = 100;
      const offset = page * limit;

      try {
        const request = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        if (request.ok) {
          const response = await request.json();
          const data = response.results;
          if (!pokemon) {
            setPokemon(data);
          } else {
            if (pokemon.length > 0) {
              setPokemon([...pokemon, ...data]);
            }
          }
        }
      } catch (e: unknown) {
        setError((e as Error).message);
      }
    };

    fetchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderContent = () => {
    if (error) return <span className="error">{error}</span>;
    if (pokemon === null)
      return (
        <div className="loading-container">
          <Spinner />
        </div>
      );
    if (Array.isArray(pokemon && pokemon.length === 0))
      return <span className="none-found">No pokemon found</span>;
    if (pokemon && pokemon.length > 0) {
      return (
        <div className="content">
          <ul className="pokemon-list">
            {pokemon.map((elm, i) => {
              const index = i + 1;
              const name = capitalize(elm.name);
              return (
                <li className="pokemon" key={index}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
                  />
                  <Link to={`/${elm.name}`}>
                    <span>{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="load-more" ref={ref}>
            <Spinner />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <header>
        <h1>Pokedex</h1>
      </header>
      <main>{renderContent()}</main>
    </div>
  );
}

export default App;
