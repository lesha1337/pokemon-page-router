import { Header } from "@/components/layout/Header";
import { MainContent } from "@/components/layout/MainContent";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent, useMemo, useState } from "react";
import useSWR from "swr";
import { fetchPokemonList, fetchPokemonListURL } from "@/lib/api";
import { GetStaticProps } from "next";
import { Button } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";
import { TRevalidateQueryParams } from "@/pages/api/revalidate";
import Link from "next/link";
import { useLocale } from "@/lib/hooks/useLocale";

// fetch translations for the page at build time
export const getStaticProps = (async (context) => {
  const messages = (await import(`../i18n/${context.locale}.json`)).default;
  return { props: { messages } };
}) satisfies GetStaticProps;

export default function Page() {
  const t = useTranslations("contentRevalidationPage");

  // fetch the list of Pokémon using SWR for data caching
  const { data: pokemonList } = useSWR(fetchPokemonListURL, fetchPokemonList);

  const [selectedPageToRevalidate, setSelectedPageToRevalidate] =
    useState<string>();

  // setup mutation for triggering page revalidation
  const {
    trigger: revalidatePageTrigger,
    isMutating: revalidateRequestPending,
  } = useSWRMutation(
    "/api/revalidate",
    async (url, { arg }: { arg: Required<TRevalidateQueryParams> }) => {
      await fetch(`${url}?${new URLSearchParams(arg)}`);
    },
    {
      onSuccess: () => alert("✅"),
      onError: () => alert("❌"),
    },
  );

  const { locales, defaultLocale } = useLocale();

  const selectOptions = useMemo(() => {
    if (!pokemonList?.results) return [];

    return locales.flatMap((locale) => {
      return pokemonList.results.map(({ name, path }) => {
        const fullPath = `${locale === defaultLocale ? "" : `/${locale}`}${path}`;

        return {
          label: [fullPath, name].join(" – "),
          value: fullPath,
        };
      });
    });
  }, [locales, defaultLocale, pokemonList]);

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

      <MainContent>
        <h1 className="text-4xl">{t("heroSectionTitle")}</h1>
        <p className="text-xl">{t("heroDescription")}</p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Select
            value={selectedPageToRevalidate}
            onValueChange={setSelectedPageToRevalidate}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("revalidateFormSelectPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Link to open the selected page in a new tab */}
          <Link
            href={selectedPageToRevalidate ?? ""}
            target="_blank"
            className={
              !selectedPageToRevalidate
                ? "opacity-50 pointer-events-none"
                : undefined
            }
          >
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={!selectedPageToRevalidate}
            >
              {t("revalidateFormPageLink", {
                page: selectedPageToRevalidate || "...",
              })}
            </Button>
          </Link>

          <Button
            variant={"destructive"}
            disabled={!selectedPageToRevalidate}
            className="w-full"
            type="submit"
          >
            {revalidateRequestPending ? "..." : t("revalidateFormSubmitButton")}
          </Button>
        </form>
      </MainContent>
    </>
  );
}
