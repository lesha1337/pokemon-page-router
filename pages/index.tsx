import { GetStaticProps, InferGetStaticPropsType } from "next";
import { fetchPokemonList } from "@/lib/api";
import { PokemonLinkCard } from "@/components/pokemons/PokemonLinkCard";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { useTranslations } from "next-intl";

export const getStaticProps = (async (context) => {
  return {
    props: {
      list: await fetchPokemonList(),
      messages: (await import(`../i18n/${context.locale}.json`)).default,
    },
    revalidate: 60,
  };
}) satisfies GetStaticProps;

export default function Page({
  list,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const t = useTranslations("indexPage");

  return (
    <>
      <Header />

      <Main>
        <h1 className={"text-4xl"}>{t("title")}</h1>

        <div className={"w-full grid place-items-center"}>
          <ul className={"w-full grid grid-cols-1 sm:grid-cols-3 gap-8"}>
            {list.results.map(({ name, path }) => (
              <li key={path}>
                <PokemonLinkCard path={path} name={name} />
              </li>
            ))}
          </ul>
        </div>
      </Main>
    </>
  );
}
