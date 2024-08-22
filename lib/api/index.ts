import { MainClient } from "pokenode-ts";
import { pickKeysInObject } from "@/lib/utils";
const baseURL = "https://pokeapi.co/api/v2";

export const pokemonApiClient = new MainClient();

export async function fetchPokemonList() {
  return await pokemonApiClient.pokemon.listPokemons(0, 12).then((r) => ({
    ...r,
    results: r.results.map((o) => {
      const path = o.url.slice(0, -1).replace(baseURL, "");
      const slug = path.split("/").slice(-1)[0];

      return { ...o, path, slug };
    }),
  }));
}

export async function fetchPokemonData(pokemonId: string | number) {
  const id = typeof pokemonId === "string" ? parseInt(pokemonId) : pokemonId;
  return await pokemonApiClient.pokemon.getPokemonById(id).then((r) => {
    return pickKeysInObject(r, ["name", "forms", "sprites", "abilities"]);
  });
}
