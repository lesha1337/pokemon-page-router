import { useRouter } from "next/router";
import Cookie from "js-cookie";

export function useLocale() {
  const { locale, locales, push, pathname, query, asPath } = useRouter();

  const changeLocale = (nextLocale: string) => {
    Cookie.set("NEXT_LOCALE", nextLocale, { expires: 60 * 60 * 24 * 365 });
    void push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return { locale: locale!, locales: locales!, changeLocale };
}
