import { GetStaticProps, InferGetStaticPropsType } from "next";
import { fetchPokemonList } from "@/lib/api";
import { PokemonLinkCard } from "@/components/pokemons/PokemonLinkCard";
import { Header } from "@/components/layout/Header";
import { MainContent } from "@/components/layout/MainContent";
import { useTranslations } from "next-intl";

export const getStaticProps = (async (context) => {
  return {
    props: {
      list: await fetchPokemonList(),
      // it can be an async fetch from remote resource:
      messages: (await import(`../i18n/${context.locale}.json`)).default,
    },
  };
}) satisfies GetStaticProps;

export default function Page({
  list,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const t = useTranslations("indexPage");

  return (
    <>
      <Header />

      <MainContent>
        <h1 className={"text-4xl"}>{t("title")}</h1>

        <hr />

        <ul className={"mt-2 w-full grid grid-cols-1 sm:grid-cols-3 gap-8"}>
          {list.results.map(({ name, path }) => (
            <li key={path}>
              <PokemonLinkCard path={path} name={name} />
            </li>
          ))}
        </ul>
      </MainContent>
    </>
  );
}
