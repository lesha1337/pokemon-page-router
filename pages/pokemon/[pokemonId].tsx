import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { fetchPokemonList, fetchPokemonData } from "@/lib/api";
import {
  PokemonSection,
  PokemonSectionList,
  PokemonSectionTitle,
  PokemonPictures,
} from "@/components/pokemon/components";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { useTranslations } from "next-intl";

type TStaticPathsParams = { pokemonId: string };
export const getStaticPaths = (async () => {
  const { results } = await fetchPokemonList();
  const paths = results.map((o) => ({ params: { pokemonId: o.slug } }));

  return { paths, fallback: "blocking" };
}) satisfies GetStaticPaths<TStaticPathsParams>;

type TStaticPropsAbstractType = Record<string, unknown>;
export const getStaticProps = (async ({ locale, params }) => {
  const pokemonId = params?.pokemonId;
  if (!pokemonId) return { notFound: true };

  try {
    const pokemonData = await fetchPokemonData(pokemonId);
    const updatedAt = new Date().toJSON();
    // it can be async fetch from remote resource:
    const messages = (await import(`../../i18n/${locale}.json`)).default;

    return {
      props: { locale, pokemonData, updatedAt, messages },
      revalidate: 60 * 60, // 1h
    };
  } catch {
    return { notFound: true };
  }
}) satisfies GetStaticProps<TStaticPropsAbstractType, TStaticPathsParams>;

export default function PokemonPage({
  pokemonData,
  updatedAt,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const t = useTranslations("pokemonPage");

  const pictures = Object.entries(pokemonData.sprites)
    .filter((o) => o[1])
    .slice(0, 4) as [string, string][];

  const abilities = pokemonData.abilities.map(({ ability }) => ability.name);

  const forms = pokemonData.forms.map(({ name }) => name);

  return (
    <>
      <Header />

      <Main>
        <h1 className={"text-5xl capitalize"}>{pokemonData.name}</h1>
        <span suppressHydrationWarning>
          {t("updatedAtLabel", { dateTime: new Date(updatedAt) })}
        </span>

        <hr />

        <PokemonPictures pictures={pictures} />

        <hr />

        <PokemonSection>
          <PokemonSectionTitle>
            {t("abilitiesSectionTitle")}
          </PokemonSectionTitle>
          <PokemonSectionList items={abilities} />
        </PokemonSection>

        <hr />

        <PokemonSection>
          <PokemonSectionTitle>{t("formsSectionTitle")}</PokemonSectionTitle>
          <PokemonSectionList items={forms} />
        </PokemonSection>
      </Main>
    </>
  );
}
