import Link from "next/link";
import { useTranslations } from "next-intl";
import { LocaleSelect } from "@/components/common/LocaleSelect";

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
            {t("homePageLink")}
          </Link>

          <Link href={"/content-revalidation"} className={"text-blue-300"}>
            {t("contentRevalidationPageLink")}
          </Link>
        </div>

        <LocaleSelect />
      </div>
    </header>
  );
}
