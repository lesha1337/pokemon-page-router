import Link from "next/link";

export function PokemonLinkCard(props: { path: string; name: string }) {
  return (
    <Link
      href={props.path}
      className={
        "p-4 border rounded grid place-items-center hover:bg-gray-800 transition-colors capitalize w-full"
      }
    >
      <span className={"flex flex-wrap gap-x-[1ch] whitespace-pre underline"}>
        {props.name}
      </span>
    </Link>
  );
}
