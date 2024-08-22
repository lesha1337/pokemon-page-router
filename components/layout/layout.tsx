import { ReactNode } from "react";

export function Layout(props: { children: ReactNode }) {
  return <div>{props.children}</div>;
}
