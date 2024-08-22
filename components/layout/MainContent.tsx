import { ReactNode } from "react";

export function MainContent(props: { children: ReactNode }) {
  return (
    <main
      className={"py-8 px-16 w-full flex flex-col gap-8 m-auto max-w-screen-lg"}
    >
      {props.children}
    </main>
  );
}
