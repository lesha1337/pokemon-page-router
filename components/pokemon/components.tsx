import Image from "next/image";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function PokemonSection(props: { children: ReactNode }) {
  return <section className={"grid gap-4"}>{props.children}</section>;
}

export function PokemonSectionTitle(props: { children: ReactNode }) {
  return <h2 className={"text-3xl"}>{props.children}</h2>;
}

export function PokemonSectionList(props: { items: string[] }) {
  return (
    <ul className={"flex gap-4 flex-wrap"}>
      {props.items.map((item) => (
        <li key={item} className={"border p-4 capitalize"}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PokemonPictures(props: { pictures: [string, string][] }) {
  const t = useTranslations("pokemonPage");

  return (
    <PokemonSection>
      <h2 className={"text-3xl capitalize"}>{t("photosSectionTitle")}</h2>
      <ul className={"grid grid-cols-2 md:grid-cols-4 gap-4"}>
        {props.pictures.map(([key, url]) => (
          <li
            key={key}
            className={"border grid place-items-center w-full h-full"}
          >
            <Image
              src={url}
              width={64}
              height={64}
              alt={key}
              className={"w-full h-auto scale-110"}
            />
          </li>
        ))}
      </ul>
    </PokemonSection>
  );
}
