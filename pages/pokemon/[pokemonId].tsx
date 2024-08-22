import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { fetchPokemonList, fetchPokemonData } from "@/lib/api";
import {
  PokemonSection,
  PokemonSectionList,
  PokemonSectionTitle,
  PokemonPictures,
} from "@/components/pokemon/components";
import { Header } from "@/components/layout/Header";
import { MainContent } from "@/components/layout/MainContent";
import { useTranslations } from "next-intl";

type TStaticPathsParams = { pokemonId: string };
export const getStaticPaths = (async (context) => {
  if (!context.locales?.length) throw Error("no locales defined");

  const { results } = await fetchPokemonList();

  // generate path array for each locale and pokemonId
  const paths = context.locales.flatMap((locale) =>
    results.map((o) => ({ locale, params: { pokemonId: o.slug } })),
  );

  return {
    paths, // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#getstaticpaths-return-values
    fallback: "blocking", // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
  };
}) satisfies GetStaticPaths<TStaticPathsParams>;

type TStaticPropsAbstractType = Record<string, unknown>;
export const getStaticProps = (async ({ locale, params }) => {
  const pokemonId = params?.pokemonId;

  if (!pokemonId) return { notFound: true };

  try {
    const pokemonData = await fetchPokemonData(pokemonId);
    const updatedAt = new Date().toJSON();

    // it can be an async fetch from remote resource:
    const messages = (await import(`../../i18n/${locale}.json`)).default;

    return {
      props: { locale, pokemonData, updatedAt, messages },
      revalidate: 60 * 60, // Auto-revalidate static html every hour
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

  // just mapping data, nothing interesting here:
  const pictures = Object.entries(pokemonData.sprites)
    .filter((o) => o[1])
    .slice(0, 4) as [string, string][];

  const abilities = pokemonData.abilities.map(({ ability }) => ability.name);

  const forms = pokemonData.forms.map(({ name }) => name);

  return (
    <>
      <Header />

      <MainContent>
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
      </MainContent>
    </>
  );
}
