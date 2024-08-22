import { MainClient } from "pokenode-ts";
import { pickKeysInObject } from "@/lib/utils";
const baseURL = "https://pokeapi.co/api/v2";

export const pokemonApiClient = new MainClient();

export const fetchPokemonListURL = "listPokemons";
export async function fetchPokemonList() {
  return await pokemonApiClient.pokemon[fetchPokemonListURL](0, 12).then(
    (r) => ({
      ...r,
      results: r.results.map((o) => {
        const path = o.url.slice(0, -1).replace(baseURL, "");
        const slug = path.split("/").slice(-1)[0];

        return { ...o, path, slug };
      }),
    }),
  );
}

export const fetchPokemonDataURL = "getPokemonById";
export async function fetchPokemonData(pokemonId: string | number) {
  const id = typeof pokemonId === "string" ? parseInt(pokemonId) : pokemonId;
  return await pokemonApiClient.pokemon[fetchPokemonDataURL](id).then((r) => {
    return pickKeysInObject(r, ["name", "forms", "sprites", "abilities"]);
  });
}
