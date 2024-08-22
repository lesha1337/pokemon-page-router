import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className={"max-w-full overflow-x-clip bg-gray-950 text-white"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
