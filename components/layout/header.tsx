import { useRouter } from "next/router";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("header");

  return (
    <header className={"flex justify-center w-full bg-gray-800 "}>
      <div
        className={
          "px-16 py-4 m-auto w-full max-w-screen-lg flex flex-wrap justify-between items-center gap-4"
        }
      >
        <div className={"flex gap-6 flex-wrap"}>
          <span className={"font-bold text-red-300"}>{t("logoLabel")}</span>
          <Link href={"/"} className={"text-blue-300"}>
            {t("homePageLabel")}
          </Link>
        </div>

        <LocaleSelect />
      </div>
    </header>
  );
}

function useLocale() {
  const { locale, locales, push, pathname, query, asPath } = useRouter();

  const changeLocale = (nextLocale: string) => {
    void push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return { locale: locale!, locales: locales!, changeLocale };
}

function LocaleSelect() {
  const { locale, locales, changeLocale } = useLocale();

  return (
    <Select value={locale} onValueChange={changeLocale}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Locale" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((l) => (
          <SelectItem key={l} value={l}>
            {l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
