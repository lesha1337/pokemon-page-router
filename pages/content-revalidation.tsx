import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { fetchPokemonList, fetchPokemonListURL } from "@/lib/api";
import { GetStaticProps } from "next";
import { Button } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";
import { TRevalidateQueryParams } from "@/pages/api/revalidate";

export const getStaticProps = (async (context) => {
  const messages = (await import(`../i18n/${context.locale}.json`)).default;
  return { props: { messages } };
}) satisfies GetStaticProps;

export default function Page() {
  const t = useTranslations("contentRevalidationPage");

  const { data: pokemonList } = useSWR(fetchPokemonListURL, fetchPokemonList);

  const [selectedPageToRevalidate, setSelectedPageToRevalidate] =
    useState<string>();

  const { trigger: revalidatePageTrigger } = useSWRMutation(
    "/api/revalidate",
    async (url, { arg }: { arg: Required<TRevalidateQueryParams> }) => {
      await fetch(`${url}?${new URLSearchParams(arg)}`);
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedPageToRevalidate) {
      await revalidatePageTrigger({
        revalidationPagePath: selectedPageToRevalidate,
      });
    }
  };

  return (
    <>
      <Header />
      <Main>
        <h1 className={"text-4xl"}>{t("heroSectionTitle")}</h1>
        <p className={"text-xl"}>{t("heroDescription")}</p>

        <form className={"grid gap-4"} onSubmit={handleSubmit}>
          <Select
            value={selectedPageToRevalidate}
            onValueChange={setSelectedPageToRevalidate}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("revalidateFormSelectPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {pokemonList?.results?.map(({ name, path }) => (
                <SelectItem key={path} value={path}>
                  {path} – {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <a href={selectedPageToRevalidate} target={"_blank"}>
            <Button
              type={"button"}
              variant={"secondary"}
              className={"w-full"}
              disabled={!selectedPageToRevalidate}
            >
              {t("revalidateFormPageLink", {
                page: selectedPageToRevalidate ?? "???",
              })}
            </Button>
          </a>

          <Button
            disabled={!selectedPageToRevalidate}
            className={"w-full"}
            type={"submit"}
          >
            {t("revalidateFormSubmitButton")}
          </Button>
        </form>
      </Main>
    </>
  );
}
